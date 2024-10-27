import { useRouter } from "next/router";
import Styles from "./Login.module.scss";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react"; // Jika menggunakan NextAuth

import Input from "@/component/Ui/input";

import Authlayout from "@/component/layouts/AuthLayout";
import Button from "@/component/Ui/Button";

const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const { push, query } = useRouter();

  const callBackUrl: any = query.callBackUrl || "/"; // Pastikan ada nilai default

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setIsError("");
    const form = event.target as HTMLFormElement;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl: callBackUrl,
      });

      if (res?.error) {
        setIsLoading(false);
        setIsError("Email or Password is incorrect");
      } else {
        setIsLoading(false);
        form.reset();
        push(callBackUrl); // Pastikan callBackUrl valid
      }
    } catch (error) {
      console.error("Login error:", error); // Log error untuk debugging
      setIsLoading(false);
      setIsError("Email or Password is incorrect");
    }
  };

  return (
    <Authlayout title="Login" isError={isError} link="/auth/register" linkText="Don t have an account? Sign Up ">
      <form onSubmit={handleSubmit}>
        <Input type="email" name="email" placeholder="Enter your email" label="Email" />

        <Input type="password" name="password" placeholder="Enter your password" label="Password" />

        <Button type="submit" className={Styles.login_button}>
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </form>
      <hr className={Styles.login_divider} />
      <div className={Styles.login_other}>
        <Button type="button" className={Styles.login_other_button} onClick={() => signIn("google", { callbackUrl: "/" })}>
          {" "}
          <i className="bx bxl-google"></i>Login with Google
        </Button>
      </div>
    </Authlayout>
  );
};

export default LoginView;
