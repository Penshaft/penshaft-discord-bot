// load stuffs befora app starting
import "./setup.js";

import { Client, Events, IntentsBitField } from "discord.js";
import { ApplicationGuildCommands } from "./application-guild-commands.js";
import ApplicationCommandsUtils from "./utils/application-commands.js";

const { DISCORD_APP_TOKEN, DISCORD_ORG_GUILD_ID } = process.env;

async function App() {
  try {
    const client = new Client<true>({
      intents: [
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
      ],
    });
    await client.login(DISCORD_APP_TOKEN);

    // register guild commands
    console.log(
      `Guild(${DISCORD_ORG_GUILD_ID}): Slash(/) commands registration starting...`,
    );
    ApplicationCommandsUtils.registerApplicationGuildCommands(
      client.user.id,
      DISCORD_ORG_GUILD_ID,
      ApplicationGuildCommands,
    ).then(() => {
      console.log(
        `Guild(${DISCORD_ORG_GUILD_ID}): Slash(/) commands has registered!`,
      );
    });

    client.on(Events.MessageCreate, (message) => {
      console.log("MESSAGE SENT:", message.content);
    });

    client.on(Events.ClientReady, () => {
      console.log("Client is live!");
    });

    client.on(Events.InteractionCreate, async (int) => {
      if (int.isChatInputCommand()) {
        /**
         * TODO: make a handler
         * EG: command.handler && command.handler.run(int, ...)
         */
        // const command = ApplicationGuildCommands.filter(c => c.type === 1).find((c) => c.name === int.commandName)

        if (int.commandName === "ping") {
          await int.reply({
            content: "Pong!",
            ephemeral: true,
          });
        } else if (int.commandName === "help") {
          await int.reply({
            content: "Help command will work in future!",
            ephemeral: true,
          });
        } else if (int.commandName === "invite") {
          await int.reply({
            content: "You can't add me to your guild. I'm special for here :)",
            ephemeral: true,
          });
        }
      }
    });
  } catch (error) {
    throw new Error(error);
  }
}

// call the function to start
App();
