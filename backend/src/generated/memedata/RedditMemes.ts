import { Column, Entity, Index, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Index("reddit_memes_pkey", ["id"], { unique: true })
@Entity("reddit_memes", { schema: "public" })
export class RedditMemes extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "reddit_id", length: 20 })
  redditId: string;

  @Column("character varying", { name: "subreddit", length: 50 })
  subreddit: string;

  @Column("character varying", { name: "title", length: 500 })
  title: string;

  @Column("character varying", { name: "author", length: 30 })
  author: string;

  @Column("character varying", { name: "media", length: 200 })
  media: string;

  @Column("character varying", {
    name: "meme_text",
    nullable: true,
    length: 500
  })
  memeText: string | null;

  @Column("character varying", { name: "status", nullable: true, length: 10 })
  status: string | null;

  @Column("integer", { name: "timestamp" })
  timestamp: number;

  @Column("timestamp without time zone", { name: "datetime" })
  datetime: Date;

  @Column("double precision", { name: "upvote_ratio", precision: 53 })
  upvoteRatio: number;

  @Column("integer", { name: "upvotes" })
  upvotes: number;

  @Column("integer", { name: "downvotes" })
  downvotes: number;

  @Column("character varying", { name: "nsfw", nullable: true, length: 10 })
  nsfw: string | null;

  @Column("integer", { name: "num_comments" })
  numComments: number;
}
