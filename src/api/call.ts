import axios from "axios";
import { hypixelApiKey } from "../index";

export interface quickData {
  products: [
    {
      buy_summary: [
        {
          amonut: number;
          pricePerUnit: number;
          orders: number;
        }
      ];
      sell_summary: [
        {
          amonut: number;
          pricePerUnit: number;
          orders: number;
        }
      ];
      quick_status: {
        productId: string;
        sellPrice: number;
        sellVolume: number;
        sellMovingWeek: number;
        sellOrders: number;
        buyPrice: number;
        buyVolume: number;
        buyMovingWeek: number;
        buyOrders: number;
      };
    }
  ];
}

export interface auctionData {
  uuid: string;
  auctioneer: string;
  end: number;
  item_name: string;
  bin: boolean;
  starting_bid: number;
}

export async function fetchBazaarData(): Promise<quickData> {
  const resp = await axios({
    url: "https://api.hypixel.net/skyblock/bazaar",
    params: {
      key: hypixelApiKey,
    },
    method: "GET",
  });
  return resp.data as quickData;
}
