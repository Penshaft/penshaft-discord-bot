export { };

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DISCORD_APP_TOKEN: string;
      DISCORD_ORG_GUILD_ID: string
    }
  }
}
