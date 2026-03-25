import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
  console.error("Missing Supabase env vars");
  process.exit(1);
}

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

/**
 * Function to extract the profile picture URL from a LinkedIn URL.
 * NOTE: Replace the contents of this function with your API call or scraping logic.
 */
async function getLinkedInProfilePicture(linkedinUrl) {
  try {
    const response = await fetch(
        `https://nubela.co/proxycurl/api/v2/linkedin?url=${encodeURIComponent(linkedinUrl)}&use_cache=if-present`,
        {
            headers: {
                Authorization: `Bearer ${process.env.PROXYCURL_API_KEY}`
            },
        }
    );
    const data = await response.json();
    return data.profile_pic_url ?? null; // Return the extracted image URL

  } catch (error) {
    console.error(`Failed to extract PFP for ${linkedinUrl}:`, error.message);
    return null;
  }
}

async function main() {
  console.log("Starting PFP Extraction Script...");

  // 1. Fetch participants from Supabase
  // We optimize this by only selecting participants who HAVE a linkedin link 
  // and currently DO NOT have a pfp in the database.
  const { data: participants, error: fetchError } = await supabase
    .from("participants")
    .select("id, first_name, last_name, linkedin")
    .not("linkedin", "is", null)
    .neq("linkedin", "")
    .is("pfp", null); 

  if (fetchError) {
    console.error("Failed to fetch participants:", fetchError);
    process.exit(1);
  }

  console.log(`Found ${participants.length} participants needing profile pictures.`);

  // 2. Loop through the records
  for (const participant of participants) {
    const { id, first_name, last_name, linkedin } = participant;
    console.log(`\nProcessing: ${first_name} ${last_name}`);

    // 3. Extract PFP
    const pfpUrl = await getLinkedInProfilePicture(linkedin);

    if (pfpUrl) {
      // 4. Input in the PFP box (Update the database)
      const { error: updateError } = await supabase
        .from("participants")
        .update({ pfp: pfpUrl })
        .eq("id", id);

      if (updateError) {
        console.error(`❌ DB Update failed for ${first_name}:`, updateError);
      } else {
        console.log(`✅ Successfully updated database with PFP for ${first_name}`);
      }
    } else {
      console.log(`⚠️ No PFP found or extraction failed for ${first_name}, skipping...`);
    }

    // Optional: Add a small delay between requests to avoid hitting rate limits 
    // if you are using an API service.
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log("\nProcess Complete!");
}

main().catch((err) => {
  console.error("Script failed:", err);
  process.exit(1);
});