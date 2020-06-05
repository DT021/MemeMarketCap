import { Column, Entity, Index, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Index("templates_pkey", ["id"], { unique: true })
@Entity("templates", { schema: "public" })
export class Templates extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name", length: 200 })
  name: string;

  @Column("character varying", { name: "url", length: 200 })
  url: string;

  @Column("character varying", { name: "imgflip_page", length: 200 })
  imgflipPage: string;

  @Column("character varying", {
    name: "filename",
    nullable: true,
    length: 200
  })
  filename: string | null;
}
