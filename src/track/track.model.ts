import { BelongsTo, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { License } from "../license/license.model";
import { ArchiveLicense } from "./archive-license.model";

interface TrackCreationAttrs {
    name: string;
    image: string;
    bpm: number;
    purchases: number;
    listens: number;
    audio: string;
}

@Table({tableName: 'tracks'})
export class Track extends  Model<Track, TrackCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, allowNull: false})
    image: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    purchases: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    listens: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    bpm: number;

    @Column({type: DataType.STRING, allowNull: false})
    audio: string;

    @HasMany(() => ArchiveLicense)
    licenses: ArchiveLicense[]
}