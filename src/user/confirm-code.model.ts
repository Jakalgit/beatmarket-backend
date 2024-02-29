import { Column, DataType, Table, Model } from "sequelize-typescript";

interface ConfirmCodeCreationAttrs {
    code: number;
    type: string;
}

@Table({tableName: 'cofirm-code'})
export class ConfirmCode extends  Model<ConfirmCode, ConfirmCodeCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    code: number;

    @Column({type: DataType.STRING, allowNull: false})
    type: string;
}