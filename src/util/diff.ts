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
  offerProfit: number;
  basePerHour: number;
  offerPerHour: number;
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
      const price = convert(arg.id, arg.count);
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
    const price = convert(recipe.output.id, recipe.output.count);
    outputPrice = {
      buy: price,
      sell: price,
    };
  }
  let totalBuyCost = 0;
  bazaarStats.forEach((arg) => {
    totalBuyCost += arg.buy;
  });
  let totalSellCost = 0;
  bazaarStats.forEach((arg) => {
    totalSellCost += arg.sell;
  });
  const data = {
    baseProfit: outputPrice.sell - totalBuyCost,
    offerProfit: outputPrice.buy - totalSellCost,
    basePerHour: (outputPrice.sell - totalBuyCost) / recipe.duration,
    offerPerHour: (outputPrice.buy - totalSellCost) / recipe.duration,
  };
  return data;
}

export function convert(item: string, count: number): number {
  let base: number;
  switch (item) {
    case "glacite_jewel":
      base = 35000;
      break;
    case "golden_plate":
      base = 1200000;
      break;
    case "mithril_plate":
      base = 4000000;
      break;
    case "fuel_tank":
      base = 350000;
      break;
    case "bejeweled_handle":
      base = 100000;
      break;
    case "drill_engine":
      base = 3500000;
      break;
    case "treasurite":
      base = 25000;
      break;
    default:
      base = 0;
      break;
  }
  return base * count;
}
