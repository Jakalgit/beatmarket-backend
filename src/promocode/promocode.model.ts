import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Creator } from "../creator/creator.model";

interface PromoCodeCreationAttrs {
    code: string;
    count: number;
    end: string;
    type: string;
    discount: number;
    creatorId: number;
}

@Table({tableName: 'promocode'})
export class PromoCode extends  Model<PromoCode, PromoCodeCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    code: string;

    @Column({type: DataType.STRING, allowNull: false, defaultValue: 1})
    count: number;

    @Column({type: DataType.INTEGER, allowNull: false, defaultValue: Date.now() + 2678400000}) // indefinitely
    end: string;

    @Column({type: DataType.STRING, allowNull: false, defaultValue: "procent"}) // currency
    type: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    discount: number;

    @ForeignKey(() => Creator)
    @Column({type: DataType.INTEGER})
    creatorId: number;

    @BelongsTo(() => Creator)
    creator: Creator;
}