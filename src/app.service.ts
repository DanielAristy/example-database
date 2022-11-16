import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { FacturaEntity } from './entities/factura.entity';

@Injectable()
export class AppService {
  constructor(private datasoruce: DataSource ){}

  async create(factura: FacturaEntity): Promise<FacturaEntity> {
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

  async delete(id: number): Promise<boolean>  {
    const queryRunner = this.datasoruce.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const factura = await this.getFacturaById(id);

    try {
      await queryRunner.manager.remove(factura.detalleFactura);
      await queryRunner.manager.remove(factura);
      await queryRunner.commitTransaction();
      return Promise.resolve(true);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        'No se puede eliminar esta factura' + error,
        HttpStatus.CONFLICT,
      );
    }
  }

  async getFacturaById(id: number): Promise<FacturaEntity> {
    const queryRunner = this.datasoruce.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const factura = await queryRunner.manager.findOne(FacturaEntity, {
      where: {id},
      relations: {detalleFactura: true},
    });

    if (!factura) {
      throw new HttpException(
        'No existe esta factura con id ' + id,
        HttpStatus.CONFLICT,
      );
    }

    return Promise.resolve(factura);
      
  }
}
