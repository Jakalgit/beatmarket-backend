import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";
import { Creator } from "../creator/creator.model";

interface SubscribeCreationAttrs {
    creatorId: number;
    userId: number;
}

@Table({tableName: 'subscribes'})
export class Subscribe extends  Model<Subscribe, SubscribeCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Creator)
    @Column({type: DataType.INTEGER})
    creatorId: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Creator)
    creator: Creator
}