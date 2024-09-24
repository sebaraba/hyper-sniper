// sniper.ts
import { Hyperliquid, Tif } from "hyperliquid";

const private_key = "0x3524c94b436e946a58ab4fc3b582427f94190ce476a4b97eecc89cc007edee32";
const sdk = new Hyperliquid(private_key, false); // false for mainnet, true for testnet


// Transaction Configuration
const tif: Tif = "Gtc";
const coin = "PURR-SPOT";
const quantity = 120;
const nrOfRequests = 1;
const startingPrice = 0.095;
const priceIncrement = 0.01;

const requestBody = {
  coin: coin,
  is_buy: true,
  sz: quantity,
  limit_px: startingPrice,
  order_type: { limit: { tif: tif } },
  reduce_only: false
};


async function sendBatchRequests() {
  const requests = [];
  for (let i = 0; i < 3; i++) {
    const orderRequest = {
      ...requestBody,
      limit_px: requestBody.limit_px + (0.01 * i)
    };

    console.log(`\nPlacing Order ${i + 1}: date: ${new Date().toISOString()}`);
    requests.push(sdk.exchange.placeOrder(orderRequest));
  }

  try {
    const responses = Promise.all(requests);
    // responses.forEach((response, index) => {
    //   console.log(`Response for Order ${index + 1}:`, response);
    // });
  } catch (error) {
    console.error("An error occurred while placing orders:", error);
  }
}

setInterval(sendBatchRequests, 500);
