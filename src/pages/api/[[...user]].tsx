import { DeleteData, RetrieveData, UpdateData } from "@/lib/firebase/service";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const users = await RetrieveData("users");
    const data = users.map((user: any) => {
      delete user.password;
      return user;
    });
    res.status(200).json({ status: true, statusCode: 200, message: "success", data: data });
  } else if (req.method === "PUT") {
    const { id, data } = req.body;
    await UpdateData("users", id, data as any, (result: boolean) => {
      if (result) {
        res.status(200).json({ status: true, statusCode: 200, message: "success" });
      } else {
        res.status(400).json({ status: false, statusCode: 400, message: "failed" });
      }
    });
  } else if (req.method === "DELETE") {
    const { user }: any = req.query;
    await DeleteData("users", user[1], (result: boolean) => {
      if (result) {
        res.status(200).json({ status: true, statusCode: 200, message: "success" });
      } else {
        res.status(400).json({ status: false, statusCode: 400, message: "failed" });
      }
    });
  }
}
