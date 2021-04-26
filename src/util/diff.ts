import { quickData } from "./../api/call";

export interface Item {
  id: string;
  count: number;
}

export interface Recipe {
  input: Item[];
  duration: number; // In seconds
  output: Item;
}

export interface Data {
  baseProfit: number;
  basePerHour: number;
  baseCost: number;
}

export async function calcDiff(
  recipe: Recipe,
  bazaar: quickData
): Promise<Data> {
  const bazaarStats = [];
  recipe.input.forEach((arg) => {
    if (bazaar.products[arg.id.toUpperCase()]) {
      bazaarStats.push({
        buy:
          bazaar.products[arg.id.toUpperCase()].buy_summary[0].pricePerUnit *
          arg.count,
        sell:
          bazaar.products[arg.id.toUpperCase()].sell_summary[0].pricePerUnit *
          arg.count,
      });
    } else {
      const price = convert(arg.id, arg.count, bazaar, true);
      bazaarStats.push({
        buy: price,
        sell: price,
      });
    }
  });
  let outputPrice;
  if (bazaar.products[recipe.output.id.toUpperCase()]) {
    outputPrice = {
      buy:
        bazaar.products[recipe.output.id.toUpperCase()].buy_summary[0]
          .pricePerUnit * recipe.output.count,
      sell:
        bazaar.products[recipe.output.id.toUpperCase()].sell_summary[0]
          .pricePerUnit * recipe.output.count,
    };
  } else {
    const price = convert(recipe.output.id, recipe.output.count, bazaar);
    outputPrice = {
      buy: price,
      sell: price,
    };
  }
  let totalBuyCost = 0;
  bazaarStats.forEach((arg) => {
    totalBuyCost += arg.buy;
  });
  const data = {
    baseProfit: outputPrice.sell - totalBuyCost,
    basePerHour: (outputPrice.sell - totalBuyCost) / recipe.duration,
    baseCost: totalBuyCost,
  };
  return data;
}

export function convert(
  item: string,
  count: number,
  bazaar: quickData
): number {
  let base: number;
  switch (item) {
    case "glacite_jewel":
      base = 35000;
      break;
    case "golden_plate":
      base =
        bazaar.products["ENCHANTED_GOLD_BLOCK"].buy_summary[0].pricePerUnit *
          2 +
        bazaar.products["REFINED_DIAMOND"].buy_summary[0].pricePerUnit * 1 +
        175000;
      break;
    case "mithril_plate":
      base =
        bazaar.products["ENCHANTED_GOLD_BLOCK"].buy_summary[0].pricePerUnit *
          2 +
        bazaar.products["REFINED_TITANIUM"].buy_summary[0].pricePerUnit * 1 +
        bazaar.products["ENCHANTED_IRON_BLOCK"].buy_summary[0].pricePerUnit *
          1 +
        bazaar.products["REFINED_MITHRIL"].buy_summary[0].pricePerUnit * 5 +
        bazaar.products["REFINED_DIAMOND"].buy_summary[0].pricePerUnit * 1 +
        175000;
      break;
    case "fuel_tank":
      base =
        bazaar.products["ENCHANTED_COAL_BLOCK"].buy_summary[0].pricePerUnit * 2;
      break;
    case "bejeweled_handle":
      base = 105000;
      break;
    case "drill_engine":
      base =
        bazaar.products["ENCHANTED_GOLD_BLOCK"].buy_summary[0].pricePerUnit *
          2 +
        bazaar.products["REFINED_DIAMOND"].buy_summary[0].pricePerUnit * 2 +
  if (typeIsInput) {
    switch (item) {
      case "glacite_jewel":
        base = 35000;
        break;
      case "golden_plate":
        base =
          bazaar.products["ENCHANTED_GOLD_BLOCK"].buy_summary[0].pricePerUnit *
            2 +
          bazaar.products["REFINED_DIAMOND"].buy_summary[0].pricePerUnit * 1 +
          175000;
        break;
      case "mithril_plate":
        base =
          bazaar.products["ENCHANTED_GOLD_BLOCK"].buy_summary[0].pricePerUnit *
            2 +
          bazaar.products["REFINED_TITANIUM"].buy_summary[0].pricePerUnit * 1 +
          bazaar.products["ENCHANTED_IRON_BLOCK"].buy_summary[0].pricePerUnit *
            1 +
          bazaar.products["REFINED_MITHRIL"].buy_summary[0].pricePerUnit * 5 +
          bazaar.products["REFINED_DIAMOND"].buy_summary[0].pricePerUnit * 1 +
          175000;
        break;
      case "fuel_tank":
        base =
          bazaar.products["ENCHANTED_COAL_BLOCK"].buy_summary[0].pricePerUnit *
          2;
        break;
      case "bejeweled_handle":
        base = 100000;
        break;
      case "drill_engine":
        base =
          bazaar.products["ENCHANTED_GOLD_BLOCK"].buy_summary[0].pricePerUnit *
            2 +
          bazaar.products["REFINED_DIAMOND"].buy_summary[0].pricePerUnit * 2 +
          bazaar.products["TREASURITE"].buy_summary[0].pricePerUnit * 10 +
          bazaar.products["ENCHANTED_IRON_BLOCK"].buy_summary[0].pricePerUnit *
            1 +
          bazaar.products["ENCHANTED_REDSTONE_BLOCK"].buy_summary[0]
            .pricePerUnit *
            3 +
          175000;
        break;
      default:
        base = 0;
        break;
    }
  } else {
    switch (item) {
      case "glacite_jewel": {
        base = 35000;
        break;
      }
      case "golden_plate": {
        base = 1200000;
        break;
      }
      case "mithril_plate": {
        base = 4000000;
        break;
      }
      case "fuel_tank": {
        base = 350000;
        break;
      }
      case "bejeweled_handle": {
        base = 100000;
        break;
      }
      case "drill_engine": {
        base = 3500000;
        break;
      }
    }
  }
  return base * count;
}
