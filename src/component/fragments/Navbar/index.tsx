import { signIn, signOut, useSession } from "next-auth/react";
import Styles from "./Navbar.module.scss";

const Navbar = () => {
  const { data } = useSession();

  return (
    <div className={Styles.navbar}>
      <button
        className={Styles.navbar_button}
        onClick={() => {
          data ? signOut() : signIn();
        }}
      >
        {data ? "Logout" : "Login"}
      </button>
    </div>
  );
};

export default Navbar;
