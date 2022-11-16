import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { FacturaEntity } from './entities/factura.entity';

@Injectable()
export class AppService {
  constructor(private datasoruce: DataSource ){}

  async create(factura: FacturaEntity){
    const queryRunner = this.datasoruce.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newFactura = await queryRunner.manager.save(factura);
      await queryRunner.commitTransaction();
      return Promise.resolve(newFactura);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        'Tenemos problemas para insertar una factura',
        HttpStatus.CONFLICT,
      );
    }
  }
}
