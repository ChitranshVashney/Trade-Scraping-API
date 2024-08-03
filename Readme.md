This project involves creating a function to retrieve pool details for two specified tokens and gather the all trades involving those tokens from each pool. The resulting data includes details of the trades and the DEX where they occurred.

### Input

The function getPoolsWithTradeHistory requires two inputs:

- `tokenAddress1`: The address of the first token (input token).
- `tokenAddress2`: The address of the second token (output token).

```javascript
const inputTokenAddress = "0x514910771af9ca656af840dff83e8264ecf986ca"; // LINK
const outputTokenAddress = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"; // WETH
```

### Output

The function returns a Promise that resolves to an array of objects, where each object represents a pool and its associated trade history. Each pool object contains:

- `dexName`: The name of the DEX where the pool is listed.
- `poolAddress`: The address of the liquidity pool.
- `tradeHistory`: An array of trades involving the specified token pair.

**`tradeHistory` Include**:

- `block_number`: The block number where the trade occurred.
- `tx_hash`: The transaction hash of the trade.
- `tx_from_address`: The address that initiated the trade.
- `from_token_amount`: The amount of the input token involved in the trade.
- `to_token_amount`: The amount of the output token involved in the trade.
- `price_from_in_currency_token`: The price of the input token in terms of the output token.
- `price_to_in_currency_token`: The price of the output token in terms of the input token.
- `price_from_in_usd`: The price of the input token in USD.
- `price_to_in_usd`: The price of the output token in USD.
- `block_timestamp`: The timestamp when the trade occurred.
- `kind`: The type of trade (e.g., "buy" or "sell").
- `volume_in_usd`: The volume of the trade in USD.
- `from_token_address`: The address of the input token.
- `to_token_address`: The address of the output token.

_Example Output (JSON Format):_

```json
[
  {
    "dexName": "uniswap_v3",
    "poolAddress": "0xa6cc3c2531fdaa6ae1a3ca84c2855806728693e8",
    "tradeHistory": [
      {
        "block_number": 20450889,
        "tx_hash": "0xb4e99d3eb7db1217b5cf646aaa9c4e6d320bc2056862f46693fb2980b48e50dd",
        "tx_from_address": "0x000000ffa51e8fd8dc15c5b77990234810a640e8",
        "from_token_amount": "4.65717071634821",
        "to_token_amount": "0.0185668046797996",
        "price_from_in_currency_token": "0.00398671335251336",
        "price_to_in_currency_token": "1.0",
        "price_from_in_usd": "11.6025061303105",
        "price_to_in_usd": "2910.29354367698",
        "block_timestamp": "2024-08-03T22:05:23Z",
        "kind": "sell",
        "volume_in_usd": "54.0348517863325",
        "from_token_address": "0x514910771af9ca656af840dff83e8264ecf986ca",
        "to_token_address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
      },
      {
        "block_number": 20450859,
        "tx_hash": "0xd2e3126254081a7bd53a38000e163d8a1f1de3721df92d5055b4e776767c1f66",
        "tx_from_address": "0x346c802df3404bec2f265603db28b815321251ee",
        "from_token_amount": "38.6549739088577",
        "to_token_amount": "0.154238483829378",
        "price_from_in_currency_token": "0.0039901329177727",
        "price_to_in_currency_token": "1.0",
        "price_from_in_usd": "11.6119803052088",
        "price_to_in_usd": "2910.17380736545",
        "block_timestamp": "2024-08-03T21:59:23Z",
        "kind": "sell",
        "volume_in_usd": "448.860795728014",
        "from_token_address": "0x514910771af9ca656af840dff83e8264ecf986ca",
        "to_token_address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
      }
    ]
  },
  {
    "dexName": "uniswap_v2",
    "poolAddress": "0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974",
    "tradeHistory": [
      // Additional trade objects here
    ]
  }
]
```

## Running the Code

1. **Prepare Your Environment**: Ensure you are running this code in a JavaScript environment that supports the Fetch API, such as a modern web browser or a Node.js environment with a fetch polyfill.

2. **Set Token Addresses**: Replace `inputTokenAddress` and `outputTokenAddress` with the addresses of the tokens you are interested in.
3. **Execute the Code**: Run the script in your environment. The results will be logged to the console.
