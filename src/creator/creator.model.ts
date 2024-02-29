import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Track } from "../track/track.model";
import { User } from "../user/user.model";
import { PromoCode } from "../promocode/promocode.model";
import { NotificationCreator } from "./notification.model";

interface CreatorCreationAttrs {
    name: string;
    userId: number;
    image: string;
}

@Table({tableName: 'creator'})
export class Creator extends  Model<Creator, CreatorCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.INTEGER, allowNull: false, defaultValue: 0})
    stars: number;

    @Column({type: DataType.INTEGER, allowNull: false, defaultValue: 0})
    subscribes: number;

    @Column({type: DataType.STRING, allowNull: false})
    image: string;

    @Column({type: DataType.INTEGER, allowNull: false, defaultValue: 0})
    sales: number;

    @Column({type: DataType.INTEGER, allowNull: false, defaultValue: 0})
    visits: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    user: User

    @HasMany(() => Track)
    tracks: Track[]

    @HasMany(() => PromoCode)
    promoCodes: PromoCode[]

    @HasMany(() => NotificationCreator)
    notifications: NotificationCreator[]
}