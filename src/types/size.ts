export type Measurement = "px" | "%" | "em" | "rem" | "ch" | "vw" | "vh";

export type SizeValue = {
  value: string;
  measurement: Measurement;
};

export type SizeModStyle = "fixed" | "hug" | "fill";
