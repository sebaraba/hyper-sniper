import {Hyperliquid, Tif} from "hyperliquid";
import dotenv from "dotenv";

dotenv.config();

// Initialize the SDK (replace with your actual private key and other necessary parameters)
const tif: Tif = "Gtc";
const coin = "PURR-SPOT";
const private_key = process.env.PRIVATE_KEY || "0x";
const user_address = "0xC4C654EBd6124ec719eDc71Aa1d4266e2389e0F0";
const sdk = new Hyperliquid(private_key, false); // false for mainnet, true for testnet
const buyRequests: any = [];

async function testExchangeAPI() {
  try {
    const orderRequest = {
      coin: coin,
      is_buy: true,
      sz: 120,
      limit_px: 0.095,
      order_type: { limit: { tif: tif } },
      reduce_only: false
    };

    const result = await sdk.exchange.placeOrder(orderRequest);
    console.log("Order placed successfully:", result);
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    // rl.close();
  }
}

const getBatchRequests = async (coin: string) => {
  for (let i = 0; i < 3; i++) {
    const orderRequest = {
      coin: coin,
      is_buy: true,
      sz: 100,
      limit_px: 0.3 + (0.01 * i),
      order_type: { limit: { tif: tif } },
      reduce_only: false
    };

    console.log(`\nPlacing Order ${i + 1}: date: ${new Date().toISOString()}`);
    const result = await buyRequests.push(sdk.exchange.placeOrder(orderRequest));
    console.log(`Order ${i + 1} placed successfully:`, JSON.stringify(result));
  }

  return buyRequests;
}

const runBatchRequestsWithTimeout = async (timeout: number) => {
  console.log("Testing ExchangeAPI endpoints:");
  while(true) {
    for (let i = 0; i < 3; i++) {
      buyRequests.push(getBatchRequests(coin));
    }

    Promise.allSettled(buyRequests).then((results) => {
      results.forEach((result, i) => {
        if (result.status === "fulfilled") {
          console.log(`Order ${i + 1} placed successfully:`, result.value);
        } else {
          console.error(`Order ${i + 1} failed:`, result.reason);
        }
      });
    });
    await new Promise(resolve => setTimeout(resolve, timeout));
  }
}

// testCustomExchangeAPI();
testExchangeAPI();
