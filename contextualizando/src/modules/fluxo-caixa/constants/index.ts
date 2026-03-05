export type Transaction = {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: string;
  type: "entrada" | "saida";
  paymentMethod: string;
  status: "recebido" | "pendente" | "agendado" | "pago";
};

export const CATEGORY_ICONS: Record<string, string> = {
  // Entradas
  "Salário": "💰",
  "Freelance / Bicos": "💻",
  "Investimentos": "📈",
  "Presentes": "🎁",
  "Outros (Entrada)": "📥",
  // Saídas
  "Moradia": "🏠",
  "Alimentação": "🛒",
  "Transporte": "🚗",
  "Saúde": "❤️",
  "Lazer": "🎬",
  "Educação": "📚",
  "Contas": "⚡",
  "Streaming / Assinaturas": "📺",
  "Outros (Saída)": "📦",
};

export const ENTRADA_CATEGORIES = ["Salário", "Freelance / Bicos", "Investimentos", "Presentes", "Outros (Entrada)"];
export const SAIDA_CATEGORIES = ["Moradia", "Alimentação", "Transporte", "Saúde", "Lazer", "Educação", "Contas", "Streaming / Assinaturas", "Outros (Saída)"];

export const PAYMENT_METHODS: Record<string, string> = {
  "Banco": "🏦",
  "PIX": "⚡",
  "Cartão Débito": "💳",
  "Cartão Crédito": "💳",
  "Dinheiro": "💵",
};

export const STATUS_CONFIG: Record<string, { label: string; colorClass: string }> = {
  "recebido": { label: "Recebido", colorClass: "status-recebido" },
  "pendente": { label: "Pendente", colorClass: "status-pendente" },
  "agendado": { label: "Agendado", colorClass: "status-agendado" },
  "pago": { label: "Pago", colorClass: "status-pago" },
};

export function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function formatDateBR(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}
