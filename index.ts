import {Hyperliquid, Tif} from "hyperliquid";
import dotenv from "dotenv";

dotenv.config();

//export PATH=$PATH:/opt/homebrew/bin

// Transaction Configuration
const tif: Tif = "Gtc";
const coin = "PURR-SPOT";
const quantity = 120;
const nrOfRequests = 1;
const startingPrice = 0.095;
const priceIncrement = 0.01;

// Wallet Configuration
const private_key = process.env.PRIVATE_KEY || "0x";
const user_address = "0xC4C654EBd6124ec719eDc71Aa1d4266e2389e0F0";

// Initialize SDK
const sdk = new Hyperliquid(private_key, false); // false for mainnet, true for testnet
const buyRequests: any = [];


async function testExchangeAPI() {
  try {
    // Run one transaction
    // const orderRequest = {
    //   coin: coin,
    //   is_buy: true,
    //   sz: 120,
    //   limit_px: 0.095,
    //   order_type: { limit: { tif: tif } },
    //   reduce_only: false
    // };
    //
    // const result = await sdk.exchange.placeOrder(orderRequest);

    // Run batch of transactions
    // const batchRequests = getBatchRequests(coin, nrOfRequests, startingPrice, priceIncrement, quantity)
    // await Promise.allSettled(batchRequests).then((results) => {
    //   results.forEach((result, i) => {
    //     if (result.status === "fulfilled") {
    //       console.log(`Order ${i + 1} placed successfully:`, result.value);
    //     } else {
    //       console.error(`Order ${i + 1} failed:`, result.reason);
    //     }
    //   });
    // });

    // Run batch of transactions with timeout
    await runBatchRequestsWithTimeout(coin, nrOfRequests, startingPrice, quantity, priceIncrement,  1000);

    // Run transactions with timeout
    // await runRequestsWithTimeout(coin, startingPrice, quantity, priceIncrement, 500)
    console.log("Order placed successfully");
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    // rl.close();
  }
}

const getBatchRequests = (coin: string, nrOfRequests: number, startingPrice: number, priceIncrement: number, quantity: number): Promise<any>[] => {

  const buyRequests = [];

  for (let i = 0; i < nrOfRequests; i++) {
    const orderRequest = {
      coin: coin,
      is_buy: true,
      sz: quantity,
      limit_px: startingPrice + (priceIncrement * i),
      order_type: { limit: { tif: tif } },
      reduce_only: false
    };

    console.log(`\nPlacing Order ${i + 1}: date: ${new Date().toISOString()}`);
    buyRequests.push(sdk.exchange.placeOrder(orderRequest));
  }

  return buyRequests;
}

const runBatchRequestsWithTimeout = async (coin: string, nrOfRequests: number, startingPrice: number, quantity: number, priceIncrement: number, timeout: number) => {
  console.log("Testing ExchangeAPI endpoints:");
  while(true) {
    for (let i = 0; i < 3; i++) {
      buyRequests.push(getBatchRequests(coin, nrOfRequests, startingPrice, priceIncrement, quantity));
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

const runRequestsWithTimeout = async (coin: string, startingPrice: number, quantity: number, priceIncrement: number, timeout: number) => {
  console.log("Testing ExchangeAPI endpoints:");
  const i = 0
  while(true) {
    const orderRequest = {
      coin: coin,
      is_buy: true,
      sz: quantity,
      limit_px: startingPrice + (priceIncrement * i),
      order_type: { limit: { tif: tif } },
      reduce_only: false
    };

    console.log(`\nPlacing Order ${startingPrice + (priceIncrement * i)}: date: ${new Date().toISOString()}`);
    const txResult = await sdk.exchange.placeOrder(orderRequest);

    console.log(`Order ${startingPrice + (priceIncrement * i)} placed successfully:`, txResult);

    await new Promise(resolve => setTimeout(resolve, timeout));
  }
}


testExchangeAPI();
