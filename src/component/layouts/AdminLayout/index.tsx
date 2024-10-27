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
    title: "Dashboard",
    url: "/admin",
    icon: "bxs-box",
  },
];

function AdminLayout(props: Propstypes) {
  const { children } = props;
  return (
    <div className={styles.admin}>
      <Sidebar lists={listSidebarItem} />
      {children}
    </div>
  );
}

export default AdminLayout;
