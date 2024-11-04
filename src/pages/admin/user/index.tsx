import UserAdminPage from "@/component/views/admin/User";
import userServices from "@/services/user";
import { useEffect, useState } from "react";

function AdminUserPage() {
  const [users, setUser] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await userServices.getAllUsers();
      setUser(data.data);
    };
    getAllUsers();
  }, []);

  return (
    <>
      <UserAdminPage users={users} />;
    </>
  );
}

export default AdminUserPage;
