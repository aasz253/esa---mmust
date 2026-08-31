export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatKsh(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return "On request";
  return `KSh ${amount.toLocaleString()}`;
}

export function formatDate(d: Date | string): string {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTime(t: string): string {
  return t;
}

export function isUpcoming(d: Date | string): boolean {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.getTime() >= Date.now();
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
