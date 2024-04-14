// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  const { data } = await axios.get("https://www.footprint.network/api/v1/public/dashboard/d8e8ac13-bc3f-4cc6-9368-4168d52beeb5/dashcard/94186/card/40161?parameters=%5B%5D")
  console.log("result", data)
  res.status(200).json({ data: data, code: 0 });
}
