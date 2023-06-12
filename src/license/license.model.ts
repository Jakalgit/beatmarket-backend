import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Track } from "../track/track.model";
import { LicenseParagraph } from "./paragraph.model";
import { Creator } from "../creator/creator.model";

interface LicenseCreationAttrs {
    name: string;
    price: number;
    withdraw: boolean;
    creatorId: number;
}

@Table({tableName: 'license'})
export class License extends  Model<License, LicenseCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    price: number;

    @Column({type: DataType.BOOLEAN, allowNull: false, defaultValue: false})
    withdraw: boolean;

    @ForeignKey(() => Creator)
    @Column({type: DataType.INTEGER})
    creatorId: number;

    @HasMany(() => LicenseParagraph, {onDelete: 'cascade'})
    paragraphs: LicenseParagraph[];

    @BelongsTo(() => Creator)
    creator: Creator;
}