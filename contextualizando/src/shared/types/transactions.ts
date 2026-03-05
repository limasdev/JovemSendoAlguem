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

// Extrai categorias únicas das transações carregadas (dinâmico da planilha)
export function getCategoriesFromTransactions(
  transactions: Transaction[],
  type?: "entrada" | "saida"
): string[] {
  const filtered = type 
    ? transactions.filter(t => t.type === type)
    : transactions;
  
  const categories = new Set(filtered.map(t => t.category));
  return Array.from(categories).sort();
}

// Extrai métodos de pagamento únicos das transações (dinâmico da planilha)
export function getPaymentMethodsFromTransactions(transactions: Transaction[]): string[] {
  const methods = new Set(transactions.map(t => t.paymentMethod));
  return Array.from(methods).sort();
}

// Categorias padrão (fallback quando não há transações)
export const ENTRADA_CATEGORIES = ["Salário", "Freelance / Bicos", "Aluguel Recebido", "Rendimentos", "Vendas", "Bonificações", "Outros Recebimentos"];
export const SAIDA_CATEGORIES = ["Moradia", "Alimentação", "Transporte", "Saúde", "Educação", "Lazer", "Vestuário", "Internet / Telefone", "Streaming / Assinatura", "Cartão de Crédito", "Empréstimo / Dívida", "Investimentos", "Pets", "Presentes", "Outros"];

// Constantes para ícones (fallback)
export const CATEGORY_ICONS: Record<string, string> = {
  default: "",
};

// Constantes para métodos de pagamento
export const PAYMENT_METHODS: Record<string, string> = {
  "Banco": "",
  "PIX": "",
  "Cartão Débito": "",
  "Cartão Crédito": "",
  "Dinheiro": "",
};

// Constantes para status
export const STATUS_CONFIG: Record<string, { label: string; colorClass: string }> = {
  "recebido": { label: "Recebido", colorClass: "status-recebido" },
  "pendente": { label: "Pendente", colorClass: "status-pendente" },
  "agendado": { label: "Agendado", colorClass: "status-agendado" },
  "pago": { label: "Pago", colorClass: "status-pago" },
};
