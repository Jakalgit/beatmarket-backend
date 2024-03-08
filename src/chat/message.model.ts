import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Creator } from "../creator/creator.model";
import { Chat } from "./chat.model";
import { User } from "../user/user.model";

interface MessageCreationAttrs {
    text: string;
    type: string;
    chatId: number;
}

@Table({tableName: 'message'})
export class Message extends  Model<Message, MessageCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    text: string;

    @Column({type: DataType.STRING, allowNull: false, defaultValue: "text"}) // file, image
    type: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @ForeignKey(() => Chat)
    @Column({type: DataType.INTEGER})
    chatId: number;

    @BelongsTo(() => Chat)
    chat: Chat;
}