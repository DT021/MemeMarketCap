import { Column, Entity, Index, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Index("reddit_scores_pkey", ["id"], { unique: true })
@Entity("reddit_scores", { schema: "public" })
export class RedditScores extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "author", length: 30 })
  author: string;

  @Column("character varying", { name: "subreddit", length: 50 })
  subreddit: string;

  @Column("integer", { name: "td" })
  td: number;

  @Column("integer", { name: "timestamp" })
  timestamp: number;

  @Column("timestamp without time zone", { name: "datetime" })
  datetime: Date;

  @Column("double precision", { name: "final_score", precision: 53 })
  finalScore: number;

  @Column("double precision", { name: "raw_score", precision: 53 })
  rawScore: number;

  @Column("integer", { name: "num_in_bottom" })
  numInBottom: number;

  @Column("integer", { name: "num_in_top" })
  numInTop: number;

  @Column("double precision", { name: "shitposter_index", precision: 53 })
  shitposterIndex: number;

  @Column("integer", { name: "highest_upvotes" })
  highestUpvotes: number;

  @Column("double precision", { name: "hu_score", precision: 53 })
  huScore: number;

  @Column("double precision", { name: "lowest_ratio", precision: 53 })
  lowestRatio: number;
}
