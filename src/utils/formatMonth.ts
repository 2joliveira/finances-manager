export function formatMonth(value: string) {
  const [year, month] = value.split("-").map(Number);

  const date = new Date(year, month - 1, 1);

  const monthName = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
  }).format(date);

  return monthName.charAt(0).toUpperCase() + monthName.slice(1);
}