import { Snowflake } from "discord.js";
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryColumn()
  id: Snowflake;

  @Column()
  username: string;

  @Column()
  discriminator: string;

  @CreateDateColumn({
    type: "timestamp with time zone",
    name: "created_at",
    nullable: false,
  })
  createdAt?: Date;

  @UpdateDateColumn({
    type: "timestamp with time zone",
    name: "updated_at",
    nullable: false,
  })
  updatedAt?: Date;
}
