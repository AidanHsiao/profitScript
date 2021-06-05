import { Message } from "discord.js";
import { forge } from "./forge";
import { soulflow } from "./soulflow";

export async function profitFunction(
  msg: Message,
  args: string[]
): Promise<void> {
  switch (args[1]) {
    case "forge":
      await forge(msg, args);
      break;
    case "soulflow":
      await soulflow(msg);
      break;
  }
}
