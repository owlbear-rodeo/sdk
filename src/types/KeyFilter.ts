export interface KeyFilter<T> {
  key: keyof T;
  value: T[keyof T];
  operator?: "==" | "!=";
  coordinator?: "&&" | "||";
}
