import { useRouter } from "next/router";
import styles from "./Sidebar.module.scss";
import Link from "next/link";
import Button from "@/component/Ui/Button";
import { signOut } from "next-auth/react";

type Propstypes = {
  lists: Array<{
    title: string;
    url: string;
    icon: string;
  }>;
};
function Sidebar(props: Propstypes) {
  const { lists } = props;
  const { pathname } = useRouter();

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar_top}>
        <h1 className={styles.sidebar_top_title}>Admin Panel</h1>
        <div className={styles.sidebar_top_lists}>
          {lists.map((list, index) => (
            <Link href={list.url} key={index} className={`${styles.sidebar_top_lists_item} ${pathname === list.url && styles.sidebar_top_lists_item_active}`}>
              <i className={`bx ${list.icon} ${styles.sidebar_top_lists_item_icon}`} />
              <h4 className={styles.sidebar_top_lists_item_title}>{list.title}</h4>
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.sidebar_bottom}>
        <Button className={styles.sidebar_bottom_button} type="button" variant={"secondary"} onClick={() => signOut()}>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
