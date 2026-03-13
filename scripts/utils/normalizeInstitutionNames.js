// scripts/utils/normalizeInstitutionNames.js

import stringSimilarity from "string-similarity";

// Aliases must be defined BEFORE normalizeInstitutionName so they are in scope.
// Keys should be the normalized form (lowercase, no accents, no punctuation).
// Values should be the canonical normalized name you want to store.
// Alias keys are in "stage 1" normalized form:
//   lowercase, no accents, no punctuation — but filler words NOT yet stripped.
// Checking aliases before filler-word stripping prevents keys like
// "universidad miguel hernandez de elche" from being mangled to
// "universidad miguel hernandez elche" and missing the lookup.
export const institutionAliases = {
  // Abbreviations
  "mit": "massachusetts institute of technology",
  "ucsf": "university of california san francisco",
  "georgia tech": "georgia institute of technology",

  // Cross-language aliases — key is stage-1 normalized, value is canonical English name
  "universidad miguel hernandez de elche": "miguel hernandez university of elche",
  "ecole polytechnique federale de lausanne": "ecole polytechnique federale de lausanne",
};

export function normalizeInstitutionName(name) {
  if (!name) return null;

  // Stage 1: strip accents + punctuation, lowercase — filler words kept intentionally
  const stage1 = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[''`]/g, "'")
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

  // Check aliases BEFORE stripping filler words so keys match correctly
  const alias = institutionAliases[stage1];
  if (alias) return alias;

  // Stage 2: strip filler words for deduplication
  return stage1
    .replace(/\b(the|of|and|de|del|der|des|van|von)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Returns the key of an existing institution that is very similar to `name`,
// or null if no close match is found.
export function findSimilarInstitution(name, existingNames) {
  if (!existingNames.length) return null;

  const matches = stringSimilarity.findBestMatch(name, existingNames);

  if (matches.bestMatch.rating > 0.9) {
    return matches.bestMatch.target;
  }

  return null;
}