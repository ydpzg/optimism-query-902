// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";
/**
 *
 * curl --request GET \
 *      --url 'https://api.footprint.network/api/v3/address/getWalletTxnStats?chain=Ethereum&wallet_address=0x46efbaedc92067e6d60e84ed6395099723252496' \
 *      --header 'accept: application/json' \
 *      --header 'api-key: 76ob3jLbdcNIyZ9oh8Pum78aYwRybwX4W3Pz5hjeBeJqyruLmPnWymvzGCkqvI6U'
 */
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  const wallet = req.query.wallet
  console.log("req.query", req.query)
  if (!wallet) {
    return res.status(400).json({ error: "wallet is required" });
  }
  //根据上面写一个get api 方法
  const { data } = await axios.get(`https://www.footprint.network/api/v1/public/card/3d85a495-318c-4e02-bdbd-585e2d33f672/query?parameters=%5B%7B%22id%22%3A%22c505c4df-bca5-d20f-7c9b-d5f1675bd6b4%22%2C%22type%22%3A%22category%22%2C%22target%22%3A%5B%22variable%22%2C%5B%22template-tag%22%2C%22wallet_address%22%5D%5D%2C%22name%22%3A%22Wallet%20address%22%2C%22slug%22%3A%22wallet_address%22%2C%22default%22%3A%220xacD03D601e5bB1B275Bb94076fF46ED9D753435A%22%2C%22value%22%3A%5B%22${wallet}%22%5D%7D%5D`)

  console.log("result", data)
  res.status(200).json({ data: data?.data, code: 0 });
}
