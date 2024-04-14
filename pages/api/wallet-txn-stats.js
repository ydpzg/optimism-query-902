// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";
/**
 *      curl --request GET \
 *      --url 'https://api.footprint.network/api/v3/address/getWalletTxnStats?chain=Ethereum&wallet_address=0x46efbaedc92067e6d60e84ed6395099723252496' \
 *      --header 'accept: application/json'
 *                --header 'api-key: 76ob3jLbdcNIyZ9oh8Pum78aYwRybwX4W3Pz5hjeBeJqyruLmPnWymvzGCkqvI6U'
 */
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  const { data } = await axios.get("https://api.footprint.network/api/v3/address/getWalletTxnStats?chain=Ethereum&wallet_address=0x46efbaedc92067e6d60e84ed6395099723252496", {
    headers: {
      "accept": "application",
      "api-key": "76ob3jLbdcNIyZ9oh8Pum78aYwRybwX4W3Pz5hjeBeJqyruLmPnWymvzGCkqvI6U",
    }
  })
  console.log("result", data)
  res.status(200).json({ data: data, code: 0 });
}
