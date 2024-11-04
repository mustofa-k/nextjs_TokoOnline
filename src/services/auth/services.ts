import { AddData, RetrieveDataByField } from "@/lib/firebase/service";
import bcrypt from "bcryptjs";

export async function SigUp(userData: { email: string; fullname: string; phone: string; password: string; role?: string; created_at?: Date; updated_at?: Date }, callback: Function) {
  const data = await RetrieveDataByField("users", "email", userData.email);

  if (data.length > 0) {
    callback(false); // Jika email sudah ada, kembalikan status false
  } else {
    // Jika role tidak ada, tetapkan default "member"
    if (!userData.role) {
      userData.role = "member";
    }

    // Hash password sebelum menyimpan ke Firestore
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.created_at = new Date();
    userData.updated_at = new Date();

    // Simpan user data ke Firestore

    await AddData("users", userData, (result: boolean) => {
      callback(result);
    });
  }
}

export async function SigIn(email: string) {
  try {
    const data = await RetrieveDataByField("users", "email", email);
    // Jika data ditemukan, kembalikan data pertama, jika tidak kembalikan null
    if (data.length > 0) {
      return data[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null; // Kembalikan null jika ada error
  }
}

export async function loginwithGoogle(data: { email: string; role?: string; passqword?: string; created_at?: Date; updated_at?: Date }, callback: Function) {
  try {
    const user = await RetrieveDataByField("users", "email", data.email);

    if (user.length > 0) {
      callback(user[0]);
    } else {
      data.role = "member";
      data.created_at = new Date();
      data.updated_at = new Date();
      data.passqword = "";

      await AddData("users", data, (result: boolean) => {
        if (result) {
          callback(data);
        }
      });
    }
  } catch (error) {
    callback(null); // atau tangani error dengan cara lain, misalnya menampilkan pesan kepada pengguna
  }
}
