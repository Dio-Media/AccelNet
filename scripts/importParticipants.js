import XLSX from "xlsx";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { normalizeInstitutionName } from "./utils/normalizeInstitutionNames.js";

dotenv.config();

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
  console.error("Missing Supabase env vars");
  process.exit(1);
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

function normalizeName(name) {
  return name
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase());
}

async function main() {

  // 1. Read Excel file
  const filePath = process.argv[2] ?? "C:\\Users\\diogo\\OneDrive\\Documents\\clean.xlsx";
  const workbook = XLSX.readFile(filePath);

  // 2. Select sheet
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  // 3. Convert rows to JSON
  const rows = XLSX.utils.sheet_to_json(sheet);

  console.log(`Found ${rows.length} participant rows`);

  // Validate columns once
  if (rows.length && !("email" in rows[0])) {
    console.error("Expected columns not found. Got:", Object.keys(rows[0]));
    process.exit(1);
  }

  // 4. Load institutions once
  const { data: allInstitutions } = await supabase
    .from("institutions")
    .select("id, inst_name");

  const institutionMap = new Map(
    allInstitutions.map(i => [normalizeInstitutionName(i.inst_name), i.id])
  );

  // 5. Loop rows
  for (const row of rows) {

    const first_name = normalizeName(row.first_name?.trim());
    const last_name = normalizeName(row.last_name?.trim());
    const email = row.email?.trim()?.toLowerCase();
    const institutionName = row.institution
    ?.split(";")[0]
    ?.trim();
    const normalizedInstitution = normalizeInstitutionName(institutionName);

    if (!first_name || !last_name || !email) {
      console.warn("Skipping incomplete row:", row);
      continue;
    }

    const institution_id = institutionMap.get(normalizedInstitution) ?? null;

    const participant = {
      first_name,
      last_name,
      email,
      institution_id
    };

    const { error: insertError } = await supabase
      .from("participants")
      .upsert(participant, { onConflict: "email" });

    if (insertError) {
      console.error("Insert failed:", insertError);
    } else {
      console.log(`Inserted ${first_name} ${last_name}`);
    }
    if (!institution_id && institutionName) {
  console.warn(`Institution not found: ${institutionName}`);
    }

  }

}

main().catch((err) => {
  console.error("Script failed:", err);
  process.exit(1);
});