import {Hyperliquid, Tif} from "hyperliquid";


async function testExchangeAPI() {
  // Initialize the SDK (replace with your actual private key and other necessary parameters)
  const private_key = "<priv-key>";
  const user_address = "0xC4C654EBd6124ec719eDc71Aa1d4266e2389e0F0";
  const sdk = new Hyperliquid(private_key, false); // false for mainnet, true for testnet
  const tif: Tif = "Gtc";
  const coin = "YUM-SPOT";
  const buyRequests = [1];

  try {

    console.log("Testing ExchangeAPI endpoints:");
    while(true) {
      for (let i = 0; i < 3; i++) {
        const orderRequest = {
          coin: coin,
          is_buy: true,
          sz: 100,
          limit_px: 0.1 + (0.01 * i),
          order_type: { limit: { tif: tif } },
          reduce_only: false
        };

        console.log(`\nPlacing Order ${i + 1}: date: ${new Date().toISOString()}`);
        // buyRequests.push(sdk.exchange.placeOrder(orderRequest));
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    // rl.close();
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
}

// testCustomExchangeAPI();
testExchangeAPI();
