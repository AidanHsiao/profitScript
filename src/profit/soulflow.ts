import { MessageEmbed, Message } from "discord.js";
import { fetchBazaarData } from "../api/call";

export async function soulflow(msg: Message): Promise<void> {
  const bazaar = await fetchBazaarData();
  const soulflow = {
    raw: bazaar.products["RAW_SOULFLOW"].sell_summary[0].pricePerUnit,
    refined: bazaar.products["SOULFLOW"].sell_summary[0].pricePerUnit,
  };
  const embed = new MessageEmbed()
    .setTitle(
      `Soulflow Comparison | ${
        soulflow.refined > soulflow.raw * 160 ? `Worth` : `Not Worth`
      } Compacting`
    )
    .setDescription("Determines whether or not to compact soulflow.")
    .setColor("#2EBFF0")
    .addFields([
      {
        name: "Raw Soulflow Price",
        value: `\`${soulflow.raw}\``,
        inline: true,
      },
      {
        name: "Soulflow Price",
        value: `\`${soulflow.refined}\``,
        inline: true,
      },
      {
        name: "Raw Soulflow Price x 160",
        value: `\`${soulflow.raw * 160}\``,
        inline: true,
      },
      {
        name: "Raw Soulflow Profits Per Hour",
        value: `\`${(soulflow.raw * 540).toFixed(1)} - ${(
          soulflow.raw * 594
        ).toFixed(1)}\``,
        inline: true,
      },
      {
        name: "Soulflow Profits Per Hour",
        value: `\`${((soulflow.refined / 8) * 27).toFixed(1)} - ${(
          (soulflow.refined / 7.2727) *
          27
        ).toFixed(1)}\``,
        inline: true,
      },
      {
        name: "Worth Compacting?",
        value: `\`${
          soulflow.refined > soulflow.raw * 160 ? `Worth` : `Not Worth`
        }\``,
        inline: true,
      },
    ]);
  msg.channel.send(embed);
}
