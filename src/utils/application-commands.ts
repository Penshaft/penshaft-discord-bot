import { REST } from "@discordjs/rest";
import {
  RESTPutAPIApplicationGuildCommandsJSONBody,
  Routes,
  Snowflake
} from "discord.js";

const { DISCORD_APP_TOKEN } = process.env;

export default class ApplicationCommandsUtils {
  static rest: REST = new REST({ version: "10" }).setToken(DISCORD_APP_TOKEN);

  /**
   * Register application guild commands
   */
  static registerApplicationGuildCommands(
    clientID: Snowflake,
    guildID: Snowflake,
    commands: RESTPutAPIApplicationGuildCommandsJSONBody,
  ) {
    return this.rest.put(Routes.applicationGuildCommands(clientID, guildID), {
      body: commands,
    });
  }

  // /**
  //  * I forgot, this bot special to Penshaft Community
  //  * Register application global commands for the client
  //  */
  // static registerApplicationGlobalCommands(
  //   clientID: Snowflake,
  //   commands: RESTPutAPIApplicationCommandsJSONBody,
  // ) {
  //   return this.rest.put(Routes.applicationCommands(clientID), {
  //     body: commands,
  //   });
  // }
}
