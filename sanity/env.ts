// sanity/env.ts
function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (!v) {
    throw new Error(errorMessage);
  }
  return v;
}

const isStudio = typeof document !== "undefined" && document.baseURI.includes("localhost:3333");

export const apiVersion = assertValue(
  isStudio ? process.env.SANITY_STUDIO_API_VERSION : process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  "Missing environment variable: SANITY API VERSION"
);

export const dataset = assertValue(
  isStudio ? process.env.SANITY_STUDIO_DATASET : process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: SANITY DATASET"
);

export const projectId = assertValue(
  isStudio ? process.env.SANITY_STUDIO_PROJECT_ID : process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: SANITY PROJECT ID"
);

export const useCdn =
  isStudio
    ? process.env.SANITY_STUDIO_USE_CDN === "true"
    : process.env.NEXT_PUBLIC_SANITY_USE_CDN === "true";
