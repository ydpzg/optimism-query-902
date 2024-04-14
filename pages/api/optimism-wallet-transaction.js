// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";
/**
 * https://www.footprint.network/chart/Optimism-Wallet-Transaction-fp-48355
 */
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  const wallet = req.query.wallet
  if (!wallet) {
    return res.status(400).json({ error: "wallet is required" });
  }
  const { data } = await axios.get(`https://www.footprint.network/api/v1/public/card/b0ffc9c1-c8f7-4b4c-891e-9c88c86fe5c9/query?parameters=%5B%7B%22id%22%3A%2287cd5ecb-20e3-76c0-5990-cb6ba56b8de8%22%2C%22type%22%3A%22category%22%2C%22target%22%3A%5B%22variable%22%2C%5B%22template-tag%22%2C%22wallet_address%22%5D%5D%2C%22name%22%3A%22Wallet%20address%22%2C%22slug%22%3A%22wallet_address%22%2C%22default%22%3A%220x6783d49cce46303f38160a654092fa67c0d567cc%22%2C%22value%22%3A%5B%22${wallet}%22%5D%7D%5D`)
  console.log("result", data)
  res.status(200).json({ data: data?.data, code: 0 });
}
