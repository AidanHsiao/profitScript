import { Message } from "discord.js";
import { forge } from "./forge";

export async function profitFunction(
  msg: Message,
  args: string[]
): Promise<void> {
  switch (args[1]) {
    case "forge":
      await forge(msg, args);
      break;
  }
}
