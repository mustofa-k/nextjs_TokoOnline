import instance from "@/lib/axios/instance";
import { AxiosResponse } from "axios"; // Import AxiosResponse untuk tipenya

export const authServices = {
  registerAccount: async (data: any): Promise<AxiosResponse<any>> => {
    try {
      const response = await instance.post("/api/user/register", data);
      return response; // Pastikan mengembalikan respons dari axios
    } catch (error) {
      console.error("Error registering account:", error);
      throw error; // Lempar error agar bisa ditangani di handleSubmit
    }
  },
};

export default authServices;
