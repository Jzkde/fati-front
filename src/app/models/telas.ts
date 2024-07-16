export interface Telas {
  id: number;
  tela: string;
  precio: number;
  esTela: boolean;
  sistema: "ROLLER" | "VERTICALES" | "PERSIANA" | "TELA" | "DUBAI" | "ORIENTAL" | "ROMANA" | "ZEBRA"  | "VACIO";
}