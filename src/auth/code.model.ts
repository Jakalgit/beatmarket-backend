import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

interface CodeCreationAttrs {
    email: string;
    password: string;
    code: number;
}

@Table({tableName: 'code'})
export class Code extends  Model<Code, CodeCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    code: number;

    @Column({type: DataType.STRING, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;
}