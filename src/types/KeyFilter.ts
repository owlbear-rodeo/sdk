export interface KeyFilter {
  key: string | string[];
  value: unknown;
  operator?: "==" | "!=";
  coordinator?: "&&" | "||";
}
