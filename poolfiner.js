async function getPoolAddresses(tokenAddress1) {
  // Construct the API URL with the provided token address
  const apiUrl = `https://api.geckoterminal.com/api/v2/search/pools?query=${tokenAddress1}&network=eth`;

  try {
    // Fetch data from the API
    const response = await fetch(apiUrl);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Parse the JSON response
    const data = await response.json();

    // Initialize an array to store the results
    const pools = [];

    // Iterate over the pool data
    data.data.forEach((pool) => {
      // Extract DEX name and pool address
      const dexName = pool.relationships.dex.data.id;
      const poolAddress = pool.attributes.address;

      // Add the DEX name and pool address to the results array
      pools.push({
        dexName,
        poolAddress,
      });
    });

    // Return the array of objects containing DEX names and pool addresses
    return pools;
  } catch (error) {
    console.error("Error fetching pool addresses:", error);
    return [];
  }
}

async function getTradeHistory(poolAddress, tokenAddress1, tokenAddress2) {
  // Construct the API URL for trade history
  const apiUrl = `https://api.geckoterminal.com/api/v2/networks/eth/pools/${poolAddress}/trades`;

  try {
    // Fetch trade history data
    const response = await fetch(apiUrl);

    // Check if the response is successful
    if (!response.ok) {
      //   throw new Error("Network response was not ok");
      return;
    }

    // Parse the JSON response
    const data = await response.json();

    // Filter trades where token addresses match and trade history is not empty
    const trades = data.data
      .filter((trade) => {
        const fromTokenAddress =
          trade.attributes.from_token_address.toLowerCase();
        const toTokenAddress = trade.attributes.to_token_address.toLowerCase();
        return (
          fromTokenAddress === tokenAddress1.toLowerCase() &&
          toTokenAddress === tokenAddress2.toLowerCase()
        );
      })
      .map((pool) => pool.attributes);
    console.log(trades);

    // Return trade history
    return trades;
  } catch (error) {
    console.error("Error fetching trade history:", error);
    return [];
  }
}

async function getPoolsWithTradeHistory(tokenAddress1, tokenAddress2) {
  // Get pool addresses for the given token addresses
  const pools = await getPoolAddresses(tokenAddress1);

  // Initialize an array to store results with trade history
  const poolsWithTradeHistory = [];

  // Loop through each pool and fetch trade history
  for (const pool of pools) {
    const tradeHistory = await getTradeHistory(
      pool.poolAddress,
      tokenAddress1,
      tokenAddress2
    );

    // Only add pools with non-empty trade history
    if (tradeHistory.length > 0) {
      poolsWithTradeHistory.push({
        dexName: pool.dexName,
        poolAddress: pool.poolAddress,
        tradeHistory,
      });
    }
  }

  // Return the array of pools with trade history
  return poolsWithTradeHistory;
}

// Example usage:
const inputTokenAddress = "0x514910771af9ca656af840dff83e8264ecf986ca"; // LINK
const outputTokenAddress = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"; // WETH

getPoolsWithTradeHistory(inputTokenAddress, outputTokenAddress).then(
  (pools) => {
    // console.log("Pools with Trade History:", pools);
  }
);
