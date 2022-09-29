export interface KeyFilter {
  key: string;
  value: unknown;
  operator?: "==" | "!=";
  coordinator?: "&&" | "||";
}
