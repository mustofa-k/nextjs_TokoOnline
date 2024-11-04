import AdminLayout from "@/component/layouts/AdminLayout";
import Button from "@/component/Ui/Button";
import Styles from "./User.module.scss";
import { useEffect, useState } from "react";
import ModalUpdatedUsers from "./ModalUpdateUsers";

import ModalDeletedUser from "./ModalDeletedUser";

type propstype = {
  users: any;
};

function UserAdminPage(props: propstype) {
  const { users } = props;
  const [UpdateUser, setUpdateUser] = useState<any>({});
  const [usersData, setUserData] = useState<any>([]);
  const [deletedUser, setDeletedUser] = useState<any>({});

  useEffect(() => {
    setUserData(users);
  }, [users]);

  return (
    <>
      <AdminLayout>
        <div className={Styles.user}>
          <h1>Users Management</h1>
          <table className={Styles.user_table}>
            <thead>
              <tr>
                <th>#</th>
                <th>FullName</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user: any, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>
                    <div className={Styles.user_table_action}>
                      <Button type="button" onClick={() => setUpdateUser(user)} className={Styles.user_table_action_edit}>
                        <i className="bx bx-edit" />
                      </Button>
                      <Button type="button" className={Styles.user_table_action_delete} onClick={() => setDeletedUser(user)}>
                        <i className="bx bx-trash" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {Object.keys(UpdateUser).length && <ModalUpdatedUsers UpdateUser={UpdateUser} setUpdateUser={setUpdateUser} setUserData={setUserData} />}

      {Object.keys(deletedUser).length && <ModalDeletedUser deletedUser={deletedUser} setDeletedUser={setDeletedUser} setUserData={setUserData} />}
    </>
  );
}

export default UserAdminPage;
