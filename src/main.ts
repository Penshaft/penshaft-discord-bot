// load stuffs befora app starting
import "./setup.js";

import { Client, Events, IntentsBitField } from "discord.js";

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

    client.on(Events.MessageCreate, (message) => {
      console.log("MESSAGE SENT:", message.content);
    });

    client.on(Events.ClientReady, () => {
      console.log("Client is live!");
    });

    // sign in to the client
    await client.login(process.env.DISCORD_APP_TOKEN);
  } catch (error) {
    throw new Error(error);
  }
}

// call the function to start
App();
