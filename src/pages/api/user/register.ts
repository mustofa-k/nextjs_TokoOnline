import { SigUp } from "@/services/auth/services";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    await SigUp(req.body, (status: boolean) => {
      if (status) {
        res.status(200).json({ status: true, message: "success" });
      } else {
        res.status(400).json({ status: false, message: "failed" });
      }
    });
  } else {
    res.status(405).json({ status: false, statusCode: 405, message: "Method not allowed" });
  }
}
