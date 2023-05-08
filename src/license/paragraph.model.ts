import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { License } from "./license.model";

interface LicenseParagraphCreationAttrs {
    text: string;
    licenseId: number;
}

@Table({tableName: 'license-paragraph'})
export class LicenseParagraph extends  Model<LicenseParagraph, LicenseParagraphCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    text: string;

    @ForeignKey(() => License)
    @Column({type: DataType.INTEGER})
    licenseId: number;

    @BelongsTo(() => License)
    license: License
}