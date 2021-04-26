import * as Discord from "discord.js";
import { profitFunction } from "./profit/index";
const client = new Discord.Client();
const token = process.env.DISCORD_TOKEN;
const prefix = "!";
export const hypixelApiKey = process.env.HYPIXEL_API_KEY;

client.on("message", async (msg) => {
  if (msg.author.bot) return;
  if (msg.content.startsWith(prefix)) {
    const args = msg.content
      .slice(1)
      .split(" ")
      .map((arg) => arg.toLowerCase());
    switch (args[0]) {
      case "profit":
        await profitFunction(msg, args);
        break;
    }
  }
});

client.on("ready", () => {
  console.log("Bot ready!");
});

client.login(token);
