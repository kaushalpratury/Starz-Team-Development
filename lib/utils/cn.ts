type ClassValue = string | undefined | false | null;

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
