import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { ArchiveLicense } from "./archive-license.model";
import { Creator } from "../creator/creator.model";

interface TrackCreationAttrs {
    name: string;
    image: string;
    bpm: number;
    reactions: number;
    purchases: number;
    listens: number;
    audio: string;
    creatorId: number;
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

    @Column({type: DataType.INTEGER, allowNull: false, defaultValue: 0})
    reactions: number;

    @Column({type: DataType.STRING, allowNull: false})
    audio: string;

    @ForeignKey(() => Creator)
    @Column({type: DataType.INTEGER})
    creatorId: number;

    @BelongsTo(() => Creator)
    creator: Creator

    @HasMany(() => ArchiveLicense)
    licenses: ArchiveLicense[]
}