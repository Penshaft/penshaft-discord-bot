export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DISCORD_APP_TOKEN: string;
      DISCORD_ORG_GUILD_ID: string;

      PG_DATABASE_HOST: string;
      PG_DATABASE_NAME: string;
      PG_DATABASE_USER: string;
      PG_DATABASE_PASSWORD: string;
      PG_DATABASE_PORT: string; // requires to parse
      PG_DATABASE_URI?: string;
    }
  }
}
