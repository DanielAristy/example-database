import { Controller, Post, Body } from '@nestjs/common';
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
}
