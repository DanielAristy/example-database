import { Controller, Body, Param, Post, Delete, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { FacturaDto } from './dto/factura.dto';
import { FacturaEntity } from './entities/factura.entity';

@Controller('api/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('factura')
  create(@Body() factura: FacturaDto): Promise<FacturaEntity>{
    const newFactura = new FacturaEntity(factura)
    return this.appService.create(newFactura);
  }

  @Delete('factura/:id')
  delete(@Param("id") id: number): Promise<boolean>  {
    return this.appService.delete(id);
  }

  @Get("factura/:id")
  getFacturaById(@Param("id") id: number): Promise<FacturaEntity> {
    return this.appService.getFacturaById(id);
  }

  @Get("facturas")
  getAll(): Promise<FacturaEntity[]> {
    return this.appService.getAll();
  }
}
