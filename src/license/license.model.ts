import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Track } from "../track/track.model";
import { LicenseParagraph } from "./paragraph.model";
import { Archive } from "../track/archive.model";

interface LicenseCreationAttrs {
    name: string;
    price: number;
    withdraw: boolean;
    trackId: number;
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

    @ForeignKey(() => Track)
    @Column({type: DataType.INTEGER})
    trackId: number;

    @BelongsTo(() => Track)
    track: Track;

    @HasMany(() => LicenseParagraph, {onDelete: 'cascade'})
    paragraphs: LicenseParagraph[];

    @HasOne(() => Archive)
    archive: Archive;
}