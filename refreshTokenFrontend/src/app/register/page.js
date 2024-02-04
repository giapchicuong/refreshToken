"use client";
import { registerNewUser } from "@/services/loginRegisterServices";
import Link from "next/link";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import Loading from "@/components/loading";
const Register = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const defaultValueInput = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };
  const defaultValid = {
    isValidEmail: true,
    isValidUsername: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [register, setRegister] = useState(defaultValueInput);
  const [validInput, setValidInput] = useState(defaultValid);
  const [textValid, setTextValid] = useState("");

  const handleCheckValid = () => {
    setValidInput(defaultValid);
    if (!register.email) {
      setTextValid("Email is required");
      setValidInput({ ...defaultValid, isValidEmail: false });
      return false;
    }
    let regx = /^\S+@\S+\.\S+$/;
    if (!regx.test(register.email)) {
      setTextValid("Please enter a valid email address");
      setValidInput({ ...defaultValid, isValidEmail: false });
      return false;
    }
    if (!register.username) {
      setTextValid("Username is required");
      setValidInput({ ...defaultValid, isValidUsername: false });
      return false;
    }
    if (!register.password) {
      setTextValid("Password is required");
      setValidInput({ ...defaultValid, isValidPassword: false });
      return false;
    }
    if (register.confirmPassword !== register.password) {
      setTextValid("Password is not the same");
      setValidInput({ ...defaultValid, isValidConfirmPassword: false });
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    let check = handleCheckValid();
    if (check) {
      const res = await registerNewUser(register);
      if (res && res.data.err === 0) {
        router.push("/login");
      } else {
      }
    }
  };
  if (user && user.isLoading) return <Loading />;
  if (user && user.isAuthenticated) return router.push("/");

  return (
    <section className="max-w-[1440px] m-auto ">
      <div className="flex gap-6 flex-col w-[600px] h-[600px] p-6">
        <h1 className="text-5xl font-semibold text-blue-950">Register</h1>
        <div>
          <span>Already have an account! </span>
          <Link
            href={"/login"}
            className="pl-2 text-blue-500 underline cursor-pointer hover:text-blue-700"
          >
            Sign in
          </Link>
        </div>

        <div className="flex flex-col gap-1 w-[400px]">
          <label
            htmlFor="email"
            className="cursor-pointer text-blue-900 font-semibold"
          >
            Email <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="email"
            placeholder="mail@placeholde.com"
            className={`border-solid border-2 rounded-full p-3 ${
              validInput.isValidEmail ? "" : "isInvalidInput"
            }`}
            value={register.email}
            onChange={(e) =>
              setRegister({ ...register, email: e.target.value })
            }
          />
          <span className="text-red-600 text-sm pl-2">
            {validInput.isValidEmail ? "" : textValid}
          </span>
        </div>
        <div className="flex flex-col gap-1 w-[400px]">
          <label
            htmlFor="username"
            className="cursor-pointer text-blue-900 font-semibold"
          >
            Username <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="username"
            placeholder="giapchicuong"
            className={`border-solid border-2 rounded-full p-3 ${
              validInput.isValidUsername ? "" : "isInvalidInput"
            }`}
            value={register.username}
            onChange={(e) =>
              setRegister({ ...register, username: e.target.value })
            }
          />{" "}
          <span className="text-red-600 text-sm pl-2">
            {validInput.isValidUsername ? "" : textValid}
          </span>
        </div>
        <div className="flex flex-col gap-1 w-[400px]">
          <label
            htmlFor="password"
            className="cursor-pointer text-blue-900 font-semibold"
          >
            Password <span className="text-red-600">*</span>
          </label>
          <div className="flex justify-center items-center">
            <input
              type={hidePassword ? "password" : "text"}
              id="password"
              placeholder="123456"
              className="flex-1 border-solid border-2 rounded-full p-3"
              value={register.password}
              onChange={(e) =>
                setRegister({ ...register, password: e.target.value })
              }
            />
            <div
              className="cursor-pointer ml-[-35px]"
              onClick={() => setHidePassword(!hidePassword)}
            >
              <i
                class={`${hidePassword ? "fa fa-eye-slash" : "fa fa-eye"}`}
                aria-hidden="true"
              ></i>
            </div>
          </div>
          <span className="text-red-600 text-sm pl-2">
            {validInput.isValidPassword ? "" : textValid}
          </span>
        </div>
        <div className="flex flex-col gap-1 w-[400px]">
          <label
            htmlFor="confirmPassword"
            className="cursor-pointer text-blue-900 font-semibold"
          >
            Re-Password <span className="text-red-600">*</span>
          </label>
          <div className="flex justify-center items-center">
            <input
              type={hideConfirmPassword ? "password" : "text"}
              id="confirmPassword"
              placeholder="123456"
              className="flex-1 border-solid border-2 rounded-full p-3"
              value={register.confirmPassword}
              onChange={(e) =>
                setRegister({ ...register, confirmPassword: e.target.value })
              }
            />
            <div
              className="cursor-pointer ml-[-35px]"
              onClick={() => setHideConfirmPassword(!hideConfirmPassword)}
            >
              <i
                class={`${
                  hideConfirmPassword ? "fa fa-eye-slash" : "fa fa-eye"
                }`}
                aria-hidden="true"
              ></i>
            </div>
          </div>
          <span className="text-red-600 text-sm pl-2">
            {validInput.isValidConfirmPassword ? "" : textValid}
          </span>
        </div>
        <button
          className="w-[400px] bg-blue-950 rounded-full cursor-pointer border-solid border-2 py-3 text-white font-bold text-xl hover:bg-slate-400"
          onClick={() => handleRegister()}
        >
          Register
        </button>
      </div>
    </section>
  );
};

export default Register;
