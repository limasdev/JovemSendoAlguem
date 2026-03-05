export const config = {
  googleSheets: {
    spreadsheetId: import.meta.env.VITE_GOOGLE_SHEETS_ID || "",
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY || "",
    accessToken: import.meta.env.VITE_GOOGLE_ACCESS_TOKEN || "",
  },
} as const;

export function validateConfig(): void {
  const { spreadsheetId, apiKey } = config.googleSheets;

  if (!spreadsheetId) {
    console.warn("[Config] VITE_GOOGLE_SHEETS_ID is not set");
  }

  if (!apiKey) {
    console.warn("[Config] VITE_GOOGLE_API_KEY is not set");
  }
}
