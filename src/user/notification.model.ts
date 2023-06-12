import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";

interface NotificationCreationAttrs {
    text: string;
    userId: number;
}

@Table({tableName: 'user_notification'})
export class Notification extends  Model<Notification, NotificationCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.INTEGER, allowNull: false, defaultValue: Date.now()})
    number: number;

    @Column({type: DataType.STRING, allowNull: false})
    text: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    user: User;
}