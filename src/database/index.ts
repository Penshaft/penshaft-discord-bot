import { Snowflake } from "discord.js";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { PostgresConnectionCredentialsOptions } from "typeorm/driver/postgres/PostgresConnectionCredentialsOptions.js";
import { User } from "./entities/User.js";

const {
  PG_DATABASE_HOST,
  PG_DATABASE_NAME,
  PG_DATABASE_PASSWORD,
  PG_DATABASE_PORT,
  PG_DATABASE_USER,
  PG_DATABASE_URI,
} = process.env;
const connectionCredentials: PostgresConnectionCredentialsOptions = PG_DATABASE_URI
  ? { url: PG_DATABASE_URI }
  : {
      host: PG_DATABASE_HOST,
      port: Number(PG_DATABASE_PORT),
      username: PG_DATABASE_USER,
      password: PG_DATABASE_PASSWORD,
    };

export const AppDataSource = new DataSource({
  ...connectionCredentials,
  type: "postgres",
  database: PG_DATABASE_NAME,
  entities: [User],
  synchronize: true,
  logging: false,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default class Database {
  static initializeDataSources() {
    return AppDataSource.initialize();
  }

  static createUserForAppDataSource(user: User): User {
    return AppDataSource.manager.create(User, user);
  }

  static findUserByIdFromAppDataSource(id: Snowflake): Promise<User> | null {
    return AppDataSource.manager.findOneBy(User, {
      id,
    });
  }

  static saveUserToAppDataSource(user: User): Promise<User> {
    return AppDataSource.manager.save(user);
  }
}
