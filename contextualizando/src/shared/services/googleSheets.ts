const GOOGLE_SHEETS_API_URL = "https://sheets.googleapis.com/v4/spreadsheets";

interface SheetsApiResponse {
  values?: string[][];
}

export interface GoogleSheetsConfig {
  spreadsheetId: string;
  apiKey?: string;
  accessToken?: string;
}

export class GoogleSheetsService {
  private config: GoogleSheetsConfig;

  constructor(config: GoogleSheetsConfig) {
    this.config = config;
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (this.config.accessToken) {
      headers["Authorization"] = `Bearer ${this.config.accessToken}`;
    }

    return headers;
  }

  private buildUrl(range: string): string {
    const { spreadsheetId, apiKey } = this.config;
    const encodedRange = encodeURIComponent(range);
    const baseUrl = `${GOOGLE_SHEETS_API_URL}/${spreadsheetId}/values/${encodedRange}`;
    return apiKey ? `${baseUrl}?key=${apiKey}` : baseUrl;
  }

  async getData(range: string): Promise<string[][] | null> {
    try {
      const url = this.buildUrl(range);
      console.log("[GoogleSheets] Fetching:", url);
      
      const response = await fetch(url, {
        method: "GET",
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("[GoogleSheets] Error response:", errorBody);
        throw new Error(`HTTP ${response.status}: ${errorBody}`);
      }

      const data: SheetsApiResponse = await response.json();
      return data.values || null;
    } catch (error) {
      console.error("Error fetching data from Google Sheets:", error);
      throw error;
    }
  }
}

export function createGoogleSheetsService(config: GoogleSheetsConfig): GoogleSheetsService {
  return new GoogleSheetsService(config);
}

export function parseLancamentoSheetToTransactions(data: string[][]): Array<{
  id: string;
  description: string;
  category: string;
  amount: number;
  date: string;
  type: "entrada" | "saida";
  paymentMethod: string;
  status: "recebido" | "pendente" | "agendado" | "pago";
}> {
  if (!data || data.length === 0) return [];

  const [headerRow, ...rows] = data;
  const header = headerRow.map((h) => (h || "").trim().toLowerCase());

  const idx = {
    date: header.findIndex((h) => h === "data"),
    description: header.findIndex((h) => h === "descrição" || h === "descricao"),
    category: header.findIndex((h) => h === "categoria"),
    type: header.findIndex((h) => h === "tipo"),
    amount: header.findIndex((h) => h.startsWith("valor")),
    paymentMethod: header.findIndex((h) => h === "conta/pagamento" || h === "conta" || h === "pagamento"),
    status: header.findIndex((h) => h === "status"),
  };

  const normalizeType = (value: string): "entrada" | "saida" => {
    const v = (value || "").trim().toLowerCase();
    if (v.startsWith("e")) return "entrada";
    return "saida";
  };

  const normalizeStatus = (value: string): "recebido" | "pendente" | "agendado" | "pago" => {
    const v = (value || "").trim().toLowerCase();
    if (v.includes("receb")) return "recebido";
    if (v.includes("agend")) return "agendado";
    if (v.includes("pend")) return "pendente";
    return "pago";
  };

  const parseAmount = (value: string): number => {
    if (!value) return 0;
    const cleaned = value
      .replace(/\s/g, "")
      .replace(/R\$/gi, "")
      .replace(/\./g, "")
      .replace(",", ".")
      .replace(/[^0-9.-]/g, "");
    const n = Number(cleaned);
    return Number.isFinite(n) ? n : 0;
  };

  const toISODate = (value: string): string => {
    const v = (value || "").trim();
    if (!v) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v;
    const m = v.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (!m) return v;
    const [, dd, mm, yyyy] = m;
    return `${yyyy}-${mm}-${dd}`;
  };

  return rows
    .filter((r) => r.some((c) => (c || "").trim() !== ""))
    .map((row) => {
      const date = idx.date >= 0 ? toISODate(row[idx.date]) : "";
      const description = idx.description >= 0 ? (row[idx.description] || "").trim() : "";
      const category = idx.category >= 0 ? (row[idx.category] || "").trim() : "";
      const type = idx.type >= 0 ? normalizeType(row[idx.type]) : "saida";
      const amount = idx.amount >= 0 ? parseAmount(row[idx.amount]) : 0;
      const paymentMethod = idx.paymentMethod >= 0 ? (row[idx.paymentMethod] || "").trim() : "";
      const status = idx.status >= 0 ? normalizeStatus(row[idx.status]) : "pendente";

      const id = crypto.randomUUID();

      return {
        id,
        description,
        category,
        amount,
        date,
        type,
        paymentMethod,
        status,
      };
    })
    .filter((t) => t.description || t.category || t.amount || t.date);
}
