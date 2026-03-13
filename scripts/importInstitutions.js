// scripts/importInstitutions.js

import XLSX from "xlsx";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { normalizeInstitutionName, findSimilarInstitution } from "./utils/normalizeInstitutionNames.js";

dotenv.config();

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
  console.error("Missing Supabase env vars");
  process.exit(1);
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function main() {
  // 1. Read excel file — accept path as CLI arg or fall back to default
  const filePath = process.argv[2] ?? "C:\\Users\\diogo\\OneDrive\\Documents\\clean.xlsx";
  const workbook = XLSX.readFile(filePath);

  // 2. Select first sheet
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  // 3. Convert rows to JSON
  const rows = XLSX.utils.sheet_to_json(sheet);

  // 4. Guard against missing column
  if (rows.length && !("institution" in rows[0])) {
    console.error("Column 'institution' not found. Available columns:", Object.keys(rows[0]));
    process.exit(1);
  }

  // 5. Extract and clean institution names
  const institutions = rows
    .map((row) => row.institution)
    .flatMap((inst) => (inst ? inst.split(";") : []))
    .map((inst) => inst.trim().replace(/\s+/g, " "))
    .filter(Boolean);

  // 6. Deduplicate using normalization + similarity check
  const inst_map = new Map(); // normalized key -> original display name

  for (const inst of institutions) {
    const key = normalizeInstitutionName(inst);

    if (!key) continue;

    // Debug: uncomment to trace alias resolution
    // console.debug(`  normalize("${inst}") -> "${key}"`);

    const similar = findSimilarInstitution(key, [...inst_map.keys()]);

    if (similar) {
      console.warn(`Possible duplicate: "${inst}" is similar to "${inst_map.get(similar)}" — skipping`);
      continue;
    }

    if (!inst_map.has(key)) {
      inst_map.set(key, inst);
    } else {
      console.warn(`Duplicate: "${inst}" (normalized as "${key}") — skipping`);
    }
  }

  const uniqueInstitutions = [...inst_map.values()];
  console.log(`\nInserting ${uniqueInstitutions.length} unique institution(s)...\n`);

  // 7. Bulk upsert — much faster than one request per institution
  const { error } = await supabase
    .from("institutions")
    .upsert(
      uniqueInstitutions.map((inst_name) => ({ inst_name })),
      { onConflict: "inst_name", ignoreDuplicates: true }
    );

  if (error) {
    console.error("Bulk upsert failed:", error);
    process.exit(1);
  }

  console.log(`Done. ${uniqueInstitutions.length} institution(s) processed.`);
  uniqueInstitutions.forEach((name) => console.log(`  - ${name}`));
}

main().catch((err) => {
  console.error("Script failed:", err);
  process.exit(1);
});