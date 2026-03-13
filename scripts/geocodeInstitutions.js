// scripts/geocodeInstitutions.js

import { createClient } from "@supabase/supabase-js";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
  console.error("Missing Supabase env vars");
  process.exit(1);
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Manual overrides for institutions that Nominatim can't find or gets wrong.
// Add entries here as needed: inst_name (as stored in DB) -> { lat, lng }
const MANUAL_COORDINATES = {
  "Google DeepMind": { lat: 51.5347, lng: -0.1231 },         // London HQ
  "Steinway Musical Instruments, Inc": { lat: 40.7489, lng: -73.9680 }, // NYC HQ
};

// Known institution countries — used to validate Nominatim results and avoid
// returning a same-named city in the wrong country (e.g. Florence AL vs Florence Italy)
const INSTITUTION_COUNTRIES = {
  "University of Florence": "it",
  "University of Geneva": "ch",
  "Tecnologico de Monterrey": "mx",
  "University of Milano-Bicocca": "it",
  "University of Oslo": "no",
  "University of Coimbra, Coimbra, Portugal": "pt",
  "Universidad Pablo de Olavide, Sevilla (España)": "es",
  "Universidad Miguel Hernández de Elche": "es",
  "Miguel Hernandez University of Elche": "es",
  "École Polytechnique Fédérale de Lausanne (EPFL)": "ch",
  "Forschungszentrum Jülich (FZJ)": "de",
  "Paris-Saclay University": "fr",
  "University of Oxford (Alumni)": "gb",
  "Goldsmiths, University of London": "gb",
  "University College London": "gb",
};

// Strip parenthetical suffixes like "(EPFL)", "(Alumni)", "(FZJ)" before querying
function cleanNameForGeocoding(name) {
  return name
    .replace(/\s*\(.*?\)/g, "")
    .trim();
}

async function geocodeInstitution(name) {
  const cleanName = cleanNameForGeocoding(name);
  const countryCode = INSTITUTION_COUNTRIES[name];

  const params = {
    q: cleanName,
    format: "json",
    limit: 1,
    addressdetails: 1,
  };

  // If we know the country, restrict results to it — avoids Florence AL, Geneva NY, etc.
  if (countryCode) {
    params.countrycodes = countryCode;
  }

  const url = `https://nominatim.openstreetmap.org/search?` + new URLSearchParams(params);

  const res = await fetch(url, {
    headers: {
      "User-Agent": "AccelNet-Geocoder/1.0 (contact: diogomiranda8091@gmail.com)",
    },
  });

  if (!res.ok) {
    throw new Error(`Nominatim HTTP error: ${res.status}`);
  }

  const data = await res.json();

  if (!data.length) return null;

  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
  };
}

async function geocodeWithRetry(name, retries = 3) {
  // Check manual overrides first
  if (MANUAL_COORDINATES[name]) {
    console.log(`  Using manual coordinates for: ${name}`);
    return MANUAL_COORDINATES[name];
  }

  for (let i = 0; i < retries; i++) {
    try {
      const result = await geocodeInstitution(name);
      if (result) return result;
    } catch (err) {
      console.warn(`  Attempt ${i + 1} failed for ${name}:`, err.message);
    }
  }

  console.error(`  Could not geocode: ${name}`);
  return null;
}

async function main() {
  const { data: institutions, error } = await supabase
    .from("institutions")
    .select("id, inst_name")
    .is("latitude", null);

  if (error) {
    console.error("Failed to fetch institutions:", error);
    process.exit(1);
  }

  if (!institutions.length) {
    console.log("No institutions to geocode.");
    return;
  }

  console.log(`Found ${institutions.length} institution(s) to geocode.\n`);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const failed = [];

  for (const inst of institutions) {
    console.log(`Geocoding: ${inst.inst_name}`);
    const coords = await geocodeWithRetry(inst.inst_name);

    if (!coords) {
      failed.push(inst.inst_name);
      continue;
    }

    const { error: updateError } = await supabase
      .from("institutions")
      .update({ latitude: coords.lat, longitude: coords.lng })
      .eq("id", inst.id);

    if (updateError) {
      console.error(`  Failed to update ${inst.inst_name}:`, updateError);
      failed.push(inst.inst_name);
    } else {
      console.log(`  Updated -> ${coords.lat}, ${coords.lng}`);
    }

    await delay(1100); // Nominatim enforces 1 req/sec
  }

  if (failed.length) {
    console.warn(`\nFailed to geocode ${failed.length} institution(s):`);
    failed.forEach((name) => console.warn(`  - ${name}`));
    console.warn("\nAdd these to MANUAL_COORDINATES at the top of this file.");
  } else {
    console.log("\nAll institutions geocoded successfully.");
  }
}

main().catch((err) => {
  console.error("Script failed:", err);
  process.exit(1);
});