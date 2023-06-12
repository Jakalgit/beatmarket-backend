import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "../user/user.model";
import { Creator } from "../creator/creator.model";
import { PurchaseParagraph } from "./paragraph.model";

interface PurchaseCreationAttrs {
    name: string;
    bpm: number;
    price: number;
    image: string;
    license: string;
    userId: number;
    creatorId: number,
    fio: string;
}

@Table({tableName: 'purchases'})
export class Purchase extends  Model<Purchase, PurchaseCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    bpm: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    price: number;

    @Column({type: DataType.STRING, allowNull: false})
    image: string;

    @Column({type: DataType.STRING, allowNull: false})
    license: string;

    @Column({type: DataType.STRING, allowNull: false})
    fio: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @ForeignKey(() => Creator)
    @Column({type: DataType.INTEGER})
    creatorId: number;

    @BelongsTo(() => User)
    user: User

    @BelongsTo(() => Creator)
    creator: Creator

    @HasMany(() => PurchaseParagraph)
    paragraphs: PurchaseParagraph[]
}