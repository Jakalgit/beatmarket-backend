import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { License } from "../license/license.model";
import { Track } from "./track.model";

interface ArchiveLicenseCreationAttrs {
    path: string;
    licenseId: number;
    trackId: number;
}

@Table({tableName: 'archive'})
export class ArchiveLicense extends  Model<ArchiveLicense, ArchiveLicenseCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    path: string;

    @ForeignKey(() => License)
    @Column({type: DataType.INTEGER})
    licenseId: number;

    @ForeignKey(() => Track)
    @Column({type: DataType.INTEGER})
    trackId: number;

    @BelongsTo(() => License)
    license: License

    @BelongsTo(() => Track)
    track: Track
}