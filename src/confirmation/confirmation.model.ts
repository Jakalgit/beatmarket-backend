import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../user/user.model";
import { Creator } from "../creator/creator.model";
import { Track } from "../track/track.model";
import { License } from "../license/license.model";

interface ConfirmationCreationAttrs {
    token: string;
    end: number;
    reserve: number;
    creatorId: number;
    userId: number;
    trackId: number;
}

@Table({tableName: 'confirmations'})
export class Confirmation extends  Model<Confirmation, ConfirmationCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    token: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    reserve: number;

    @Column({type: DataType.INTEGER, allowNull: false, defaultValue: Date.now()})
    end: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @ForeignKey(() => Creator)
    @Column({type: DataType.INTEGER})
    creatorId: number;

    @ForeignKey(() => Track)
    @Column({type: DataType.INTEGER})
    trackId: number;

    @ForeignKey(() => License)
    @Column({type: DataType.INTEGER})
    licenseId: number;

    @BelongsTo(() => User)
    user: User

    @BelongsTo(() => Creator)
    creator: Creator

    @BelongsTo(() => Track)
    track: Track

    @BelongsTo(() => License)
    license: License
}