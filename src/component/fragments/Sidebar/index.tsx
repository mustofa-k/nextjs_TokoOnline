import styles from "./Sidebar.module.scss";

type Propstypes = {
  lists: Array<{
    title: string;
    url: string;
    icon: string;
  }>;
};
function Sidebar(props: Propstypes) {
  const { lists } = props;
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar_top}>
        <h1 className={styles.sidebar_top_title}>Admin Panel</h1>
        <div className={styles.sidebar_top_lists}>
          {lists.map((list, index) => (
            <div key={index} className={styles.sidebar_top_lists_item}>
              <i className={`bx ${list.icon}`} />
              <h4 className={styles.sidebar_top_lists_item_title}>{list.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
