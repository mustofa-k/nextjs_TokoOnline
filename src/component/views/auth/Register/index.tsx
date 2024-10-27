import { useRouter } from "next/router";
import Styles from "./Register.module.scss";
import Link from "next/link";
import { FormEvent, useState } from "react";
import Input from "@/component/Ui/input";

import authServices from "@/services/auth";
import Authlayout from "@/component/layouts/AuthLayout";
import Button from "@/component/Ui/Button";

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const { push } = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setIsError("");

    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullName: form.fullName.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    try {
      const result = await authServices.registerAccount(data);

      if (result && result.status === 200) {
        form.reset();
        setIsLoading(false);
        push("/auth/login");
      } else {
        setIsLoading(false);
        setIsError(result?.data?.message || "Email sudah terdaftar atau terjadi kesalahan");
      }
    } catch (error: any) {
      console.error("Registration failed:", error);
      setIsLoading(false);
      setIsError(error.response?.data?.message || "Terjadi kesalahan, silakan coba lagi.");
    }
  };

  return (
    <Authlayout title="Register" link="/auth/login" linkText="have an account? Sign in " isError={isError}>
      <form onSubmit={handleSubmit}>
        <Input label="Email" name="email" type="email" />
        <Input label="FullName" name="fullName" type="text" />
        <Input label="Phone" name="phone" type="text" />
        <Input label="Password" name="password" type="password" />

        <Button type="submit" className={Styles.register_button}>
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </form>
    </Authlayout>
  );
};

export default RegisterView;
