import React from "react";
import Styles from "./Authlayout.module.scss";
import Link from "next/link";

type Proptypes = {
  isError?: string;
  title?: string;
  children?: React.ReactNode;
  link: string;
  linkText?: string;
};
function Authlayout(props: Proptypes) {
  const { isError, title, children, link, linkText } = props;
  return (
    <div className={Styles.auth}>
      <h1 className={Styles.auth_title}>{title}</h1>
      {isError && <p className={Styles.auth_error}>{isError}</p>}
      <div className={Styles.auth_form}>
        {children}

        <p className={Styles.auth_link}>
          {linkText}{" "}
          <Link className="" href={link}>
            here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Authlayout;
