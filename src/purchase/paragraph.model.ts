import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Purchase } from "./purchase.model";

interface PurchaseParagraphCreationAttrs {
    text: string;
    purchaseId: number;
}

@Table({tableName: 'purchase-paragraph'})
export class PurchaseParagraph extends  Model<PurchaseParagraph, PurchaseParagraphCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    text: string;

    @ForeignKey(() => Purchase)
    @Column({type: DataType.INTEGER})
    purchaseId: number;

    @BelongsTo(() => Purchase)
    purchase: Purchase
}