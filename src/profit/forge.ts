import { MessageEmbed, Message } from "discord.js";
import { fetchBazaarData } from "../api/call";
import { calcDiff } from "../util/diff";

export async function forge(msg: Message): Promise<void> {
  const forgeList = [];
  const bazaar = await fetchBazaarData();
  const refined_diamond = await calcDiff({
    input: [
      {
        id: "enchanted_diamond_block",
        count: 2,
      },
    ],
    duration: 8,
    output: {
      id: "refined_diamond",
      count: 1,
    },
  }, bazaar);
  const refined_mithril = await calcDiff({
    input: [
      {
        id: "enchanted_mithril",
        count: 160,
      },
    ],
    duration: 6,
    output: {
      id: "refined_mithril",
      count: 1,
    },
  }, bazaar);
  const refined_titanium = await calcDiff({
    input: [
      {
        id: "enchanted_titanium",
        count: 16,
      },
    ],
    duration: 12,
    output: {
      id: "refined_titanium",
      count: 1,
    },
  }, bazaar);
  const fuel_tank = await calcDiff({
    input: [
      {
        id: "enchanted_coal_block",
        count: 2,
      },
    ],
    duration: 10,
    output: {
      id: "fuel_tank",
      count: 1,
    },
  }, bazaar);
  const bejeweled_handle = await calcDiff({
    input: [
      {
        id: "glacite_jewel",
        count: 3,
      },
    ],
    duration: 0.5,
    output: {
      id: "bejeweled_handle",
      count: 1,
    },
  }, bazaar);
  const drill_engine = await calcDiff({
    input: [
      {
        id: "enchanted_iron_block",
        count: 1,
      },
      {
        id: "enchanted_redstone_block",
        count: 3,
      },
      {
        id: "golden_plate",
        count: 1,
      },
      {
        id: "treasurite",
        count: 10,
      },
      {
        id: "refined_diamond",
        count: 1,
      },
    ],
    duration: 28,
    output: {
      id: "drill_engine",
      count: 1,
    },
  }, bazaar);
  const golden_plate = await calcDiff({
    input: [
      {
        id: "enchanted_gold_block",
        count: 2,
      },
      {
        id: "glacite_jewel",
        count: 5,
      },
      {
        id: "refined_diamond",
        count: 1,
      },
    ],
    duration: 6,
    output: {
      id: "golden_plate",
      count: 1,
    },
  }, bazaar);
  const mithril_plate = await calcDiff({
    input: [
      {
        id: "refined_mithril",
        count: 5,
      },
      {
        id: "golden_plate",
        count: 1,
      },
      {
        id: "enchanted_iron_block",
        count: 1,
      },
      {
        id: "refined_titanium",
        count: 1,
      },
    ],
    duration: 16,
    output: {
      id: "mithril_plate",
      count: 1,
    },
  }, bazaar);
  forgeList.push({
    name: "Refined Diamond",
    data: refined_diamond,
  });
  forgeList.push({
    name: "Refined Mithril",
    data: refined_mithril,
  });
  forgeList.push({
    name: "Refined Titanium",
    data: refined_titanium,
  });
  forgeList.push({
    name: "Fuel Tank",
    data: fuel_tank,
  });
  forgeList.push({
    name: "Bejeweled Handle",
    data: bejeweled_handle,
  });
  forgeList.push({
    name: "Drill Engine",
    data: drill_engine,
  });
  forgeList.push({
    name: "Golden Plate",
    data: golden_plate,
  });
  forgeList.push({
    name: "Mithril Plate",
    data: mithril_plate,
  });
  const fields = [];
  forgeList.forEach((arg) => {
    fields.push({
      name: `${arg.name} Base Profit`,
      value: `\`${arg.data.baseProfit.toFixed(2)}\``,
      inline: true,
    });
    fields.push({
      name: `${arg.name} Profit Per Hour`,
      value: `\`${arg.data.basePerHour.toFixed(2)}\``,
      inline: true,
    });
    fields.push({
      name: `${arg.name} Profit Per Hour With Offers`,
      value: `\`${arg.data.offerPerHour.toFixed(2)}\``,
      inline: true,
    });
  });
  const embed = new MessageEmbed()
    .setTitle("Forge profit list")
    .setDescription("List of all refinements and their profit values.")
    .addFields(fields)
    .setColor("#FF0000");
  msg.channel.send(embed);
}
