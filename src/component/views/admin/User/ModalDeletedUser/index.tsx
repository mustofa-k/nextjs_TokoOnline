import Button from "@/component/Ui/Button";
import Modal from "@/component/Ui/Modal";
import userServices from "@/services/user";
import Styles from "./ModalDeletedUser.module.scss";

const ModalDeletedUser = (props: any) => {
  const { deletedUser, setDeletedUser, setUserData } = props;
  const handleDelete = async () => {
    userServices.deleteUser(deletedUser.id);
    setDeletedUser({});
    const { data } = await userServices.getAllUsers();
    setUserData(data.data);
  };
  return (
    <Modal onClose={() => setDeletedUser({})}>
      <h1 className={Styles.modal_title}>Are you sure you want to delete this user?</h1>
      <Button type="button" onClick={() => handleDelete()}>
        Delete
      </Button>
    </Modal>
  );
};

export default ModalDeletedUser;
