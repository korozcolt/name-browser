import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Name extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING(255), allowNull: false })
  name: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  dni: number;

  @Column({ type: DataType.DATE, allowNull: false })
  responseTime: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  createdAt: Date;
}
