export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DISCORD_APP_TOKEN: string;
    }
  }
}
