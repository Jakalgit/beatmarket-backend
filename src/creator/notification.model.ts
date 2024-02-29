import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Creator } from "./creator.model";

interface NotificationCreationAttrs {
    text: string;
    creatorId: number;
}

@Table({tableName: 'creator-notifications'})
export class NotificationCreator extends  Model<NotificationCreator, NotificationCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.INTEGER, allowNull: false, defaultValue: Date.now()})
    number: number;

    @Column({type: DataType.STRING, allowNull: false})
    text: string;

    @ForeignKey(() => Creator)
    @Column({type: DataType.INTEGER})
    creatorId: number;

    @BelongsTo(() => Creator)
    creator: Creator;
}