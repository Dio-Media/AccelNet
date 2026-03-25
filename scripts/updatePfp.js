import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import sharp from "sharp";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// helper delay
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// clean LinkedIn URLs
function cleanLinkedInUrl(url) {
  return url.split("?")[0];
}

// 🔥 LINKEDIN FETCH
async function getLinkedInProfilePicture(linkedinUrl, retries = 3) {
  if (!linkedinUrl || !linkedinUrl.includes("linkedin.com/in")) return null;

  const options = {
    method: "GET",
    url: "https://linkedin-api8.p.rapidapi.com/get-profile-data-by-url",
    params: {
      url: linkedinUrl,
    },
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": "linkedin-api8.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);

    const data = response.data?.data;

    const image =
      data?.profilePicture ||
      data?.profilePictureDisplayImage?.elements?.[0]?.identifiers?.[0]?.identifier ||
      null;

    return image;

  } catch (error) {
    const status = error.response?.status;

    console.log(`Error ${status} for ${linkedinUrl}`);

    if (status === 429) {
      const delay = 8000 + Math.random() * 5000;
      console.log(`429 → waiting ${Math.round(delay)}ms`);
      await sleep(delay);

      if (retries > 0) {
        return getLinkedInProfilePicture(linkedinUrl, retries - 1);
      }
    }

    if (status === 403) {
      console.log(`403 BLOCKED → skipping permanently`);
      return "BLOCKED";
    }

    if (retries > 0) {
      const delay = 4000 + Math.random() * 3000;
      await sleep(delay);
      return getLinkedInProfilePicture(linkedinUrl, retries - 1);
    }

    return null;
  }
}

// 🔥 IMAGE OPTIMIZATION + UPLOAD
async function uploadImageToSupabase(imageUrl, fileName, id) {
  try {
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });

    const optimized = await sharp(response.data)
      .resize(300, 300, { fit: "cover" })
      .jpeg({ quality: 80 })
      .toBuffer();

    const group = Math.floor(id / 100) * 100;
    const path = `participants/${group}/${fileName}.jpg`;

    const { error } = await supabase.storage
      .from("pfp")
      .upload(path, optimized, {
        contentType: "image/jpeg",
        upsert: true,
      });

    if (error) {
      console.error("Upload error:", error);
      return null;
    }

    return supabase.storage.from("pfp").getPublicUrl(path).data.publicUrl;

  } catch (err) {
    console.error("Upload failed:", err.message);
    return null;
  }
}

// 🔥 MAIN
async function main() {
  console.log("Starting SAFE PFP pipeline...");

  const { data: participants, error } = await supabase
    .from("participants")
    .select("id, first_name, last_name, linkedin")
    .not("linkedin", "is", null)
    .neq("linkedin", "")
    .is("pfp", null)
    .or("pfp_attempted.is.null,pfp_attempted.eq.false")
    .limit(20);

  if (error) {
    console.error(error);
    return;
  }

  for (const p of participants) {
    const { id, first_name, last_name, linkedin } = p;

    console.log(`\nProcessing: ${first_name} ${last_name}`);

    const safeName = `${id}_${first_name}_${last_name}`
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "");

    const cleanUrl = cleanLinkedInUrl(linkedin);

    const img = await getLinkedInProfilePicture(cleanUrl);

    // 🚨 BLOCKED USER → mark permanently failed
    if (img === "BLOCKED") {
      await supabase
        .from("participants")
        .update({
          pfp_attempted: true,
          pfp_failed: true,
          pfp_last_attempt: new Date(),
        })
        .eq("id", id);

      console.log("❌ BLOCKED (saved as failed)");
      continue;
    }

    // 🚨 NO IMAGE FOUND
    if (!img) {
      await supabase
        .from("participants")
        .update({
          pfp_attempted: true,
          pfp_last_attempt: new Date(),
        })
        .eq("id", id);

      console.log("❌ No image");
      continue;
    }

    const uploaded = await uploadImageToSupabase(img, safeName, id);

    if (!uploaded) {
      console.log("❌ Upload failed");
      continue;
    }

    // ✅ SUCCESS
    await supabase
      .from("participants")
      .update({
        pfp: uploaded,
        pfp_attempted: true,
        pfp_failed: false,
        pfp_last_attempt: new Date(),
      })
      .eq("id", id);

    console.log("✅ Success");

    const delay = 4000 + Math.random() * 4000;
    await sleep(delay);
  }

  console.log("DONE ✅");
}

main();