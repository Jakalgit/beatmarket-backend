import { Column, DataType, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Block } from "./block.model";
import { NotificationUser } from "./notification.model";
import { Subscribe } from "./subscribe.model";
import { Confirmation } from "../confirmation/confirmation.model";

interface UserCreationAttrs {
    name: string;
    identifier: string;
    email: string;
    password: string;
    image: string;
}

@Table({tableName: 'users'})
export class User extends  Model<User, UserCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    identifier: string;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, unique: true, allowNull: true})
    phone: string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @Column({type: DataType.STRING, allowNull: false})
    image: string;

    @HasOne(() => Block)
    block: Block

    @HasMany(() => NotificationUser)
    notifications: NotificationUser[]

    @HasMany(() => Subscribe)
    subscribes: Subscribe[]

    @HasMany(() => Confirmation)
    confirmation: Confirmation[]
}