import { FacturaDetalleDto } from "./detalle-factura.dto";

export class FacturaDto {
  clienteNombre: string;
  clienteCorreo?: string;
  detalleFactura?: FacturaDetalleDto[];
}
