import { BadRequestException, NotFoundException } from '@nestjs/common';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  QueryRunner,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { CommonEntity } from './common-entity';
import { MultiSelect } from './multi-select';

export class CrudService<T extends CommonEntity> {
  protected repository: Repository<T>;

  constructor(repository?: Repository<T>) {
    if (repository) {
      this.repository = repository;
    }
  }

  throwBadRequestException(msg?: any): BadRequestException {
    throw new BadRequestException(msg);
  }

  throwNotFoundException(): NotFoundException {
    throw new NotFoundException();
  }

  async find(option?: FindManyOptions): Promise<T[]> {
    return await this.repository.find(option);
  }

  async findOneAndDuplicate(option: FindOneOptions<T>): Promise<boolean> {
    const entity = await this.repository.findOne(option);
    if (entity) {
      return true;
    } else {
      return false;
    }
  }

  async findOne(options: FindOneOptions<T>): Promise<T> {
    return await this.repository.findOne(options);
  }

  async findAndCount(option?: FindManyOptions): Promise<[T[], number]> {
    return await this.repository.findAndCount(option);
  }

  create(body: DeepPartial<T>): T {
    return this.repository.create(body);
  }

  async count(options?: FindOneOptions<T>): Promise<number> {
    return this.repository.count(options);
  }

  async createAndSave(body: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(body);
    return await entity.save();
  }

  async update(findOneOptions: FindOneOptions, body: DeepPartial<T>) {
    const entity: T = await this.findOne(findOneOptions);
    if (!entity) {
      this.throwNotFoundException();
    }
    const merge = this.repository.merge(entity, body);
    return await merge.save();
  }

  async softRemove(entity: DeepPartial<T>): Promise<T> {
    return this.repository.softRemove(entity);
  }

  merge(entity: T, body: DeepPartial<T>): T {
    return this.repository.merge(entity, body);
  }

  async save(entity: DeepPartial<T>): Promise<T> {
    return this.repository.save(entity);
  }

  async remove(findOneOptions?: FindOneOptions): Promise<void> {
    const entity: T = await this.findOne(findOneOptions);
    if (!entity) {
      this.throwNotFoundException();
    }
    await entity.softRemove();
  }

  async bulkRemove(entities: DeepPartial<T[]>) {
    await this.repository.softRemove(entities);
  }

  createQueryBuilder(
    alias: string,
    queryRunner?: QueryRunner,
  ): SelectQueryBuilder<T> {
    return this.repository.createQueryBuilder(alias, queryRunner);
  }
}
