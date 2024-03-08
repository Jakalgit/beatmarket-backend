import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Creator } from "../creator/creator.model";
import { User } from "../user/user.model";
import { Message } from "./message.model";

interface ChatCreationAttrs {
    idOwner1: number;
    idOwner2: number;
}

@Table({tableName: 'chat'})
export class Chat extends  Model<Chat, ChatCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    idOwner1: number

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    idOwner2: number

    @BelongsTo(() => User)
    user: User[]

    @HasMany(() => Message)
    messages: Message[]
}