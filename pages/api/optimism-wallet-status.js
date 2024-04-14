// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";
/**
 * https://www.footprint.network/chart/Optimism-w-status-fp-48346
 */
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  const wallet = req.query.wallet
  if (!wallet) {
    return res.status(400).json({ error: "wallet is required" });
  }
  const { data } = await axios.get(`https://www.footprint.network/api/v1/public/card/f0a1d718-cb8b-412b-bd5b-73f2c45b81f8/query?parameters=%5B%7B%22id%22%3A%22f0e4b780-03a6-e444-df57-479aa6f6962f%22%2C%22type%22%3A%22category%22%2C%22target%22%3A%5B%22variable%22%2C%5B%22template-tag%22%2C%22wallet_address%22%5D%5D%2C%22name%22%3A%22Wallet%20address%22%2C%22slug%22%3A%22wallet_address%22%2C%22value%22%3A%5B%22${wallet}%22%5D%7D%5D`);
  res.status(200).json({ data: data?.data, code: 0 });
}
