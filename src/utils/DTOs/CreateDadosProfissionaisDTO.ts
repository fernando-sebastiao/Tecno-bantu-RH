export interface DadosProfissionaisDTO {
  id?: number;
  data_admissao: string;
  numero_despacho: string;
  contrato: "CTD" | "CAP";
  Id_funcionario: number;
  data_despacho: string;
}
