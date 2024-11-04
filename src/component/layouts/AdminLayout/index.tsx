import Sidebar from "@/component/fragments/Sidebar";
import styles from "./AdminLayout.module.scss";

type Propstypes = {
  children: React.ReactNode;
};

const listSidebarItem = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: "bxs-dashboard",
  },
  {
    title: "Product",
    url: "/admin/product",
    icon: "bxs-box",
  },
  {
    title: "User",
    url: "/admin/user",
    icon: "bxs-group",
  },
];

function AdminLayout(props: Propstypes) {
  const { children } = props;
  return (
    <div className={styles.admin}>
      <Sidebar lists={listSidebarItem} />
      <div className={styles.admin_main}>{children}</div>
    </div>
  );
}

export default AdminLayout;
