import Button from "@/component/Ui/Button";
import Input from "@/component/Ui/input";
import Modal from "@/component/Ui/Modal";
import Select from "@/component/Ui/Select";
import userServices from "@/services/user";
import { FormEvent, useState } from "react";

const ModalUpdatedUsers = (props: any) => {
  const { UpdateUser, setUpdateUser, setUserData } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const form: any = event.target as HTMLFormElement;
    const data = {
      role: form.role.value,
    };

    const result = await userServices.updateUser(UpdateUser.id, data);

    if (result.status === 200) {
      setIsLoading(false);
      setUpdateUser({});
      const { data } = await userServices.getAllUsers();
      setUserData(data.data);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={() => setUpdateUser({})}>
      <h1>Update User</h1>
      <form onSubmit={handleUpdateUser}>
        <Input label="Email" name="email" type="email" defaultValue={UpdateUser.email} disabled />
        <Input label="FullName" name="fullName" type="text" defaultValue={UpdateUser.fullName} disabled />
        <Input label="Phone" name="phone" type="text" defaultValue={UpdateUser.phone} disabled />
        <Select
          label="Role"
          name="role"
          defaultValue={UpdateUser.role}
          options={[
            { label: "Member", value: "member" },
            { label: "Admin", value: "admin" },
          ]}
        />
        <Button type="submit">Update</Button>
      </form>
    </Modal>
  );
};

export default ModalUpdatedUsers;
