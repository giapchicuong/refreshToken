"use client";
import { loginUser } from "@/services/loginRegisterServices";
import Link from "next/link";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";
import Loading from "@/components/loading";
const Login = () => {
  const { loginContext, user } = useContext(UserContext);
  const router = useRouter();
  const defaultValueInput = {
    email: "",
    password: "",
  };
  const defaultValid = {
    isValidEmail: true,
    isValidPassword: true,
  };
  const [hidePassword, setHidePassword] = useState(true);
  const [login, setLogin] = useState(defaultValueInput);
  const [validInput, setValidInput] = useState(defaultValid);
  const [textValid, setTextValid] = useState("");

  const handleCheckValid = () => {
    setValidInput(defaultValid);
    if (!login.email) {
      setTextValid("Email is required");
      setValidInput({ ...defaultValid, isValidEmail: false });
      return false;
    }
    let regx = /^\S+@\S+\.\S+$/;
    if (!regx.test(login.email)) {
      setTextValid("Please enter a valid email address");
      setValidInput({ ...defaultValid, isValidEmail: false });
      return false;
    }
    if (!login.password) {
      setTextValid("Password is required");
      setValidInput({ ...defaultValid, isValidPassword: false });
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    let check = handleCheckValid();

    if (check) {
      const res = await loginUser(login);
      if (res && res.EC === 0) {
        const accessToken = res.DT.accessToken;
        const email = res.DT.email;
        const groupId = res.DT.groupId;
        const avatar = res.DT.avatar;

        let data = {
          isAuthenticated: true,
          accessToken: accessToken,
          account: {
            email,
            groupId,
            avatar,
          },
        };
        loginContext(data);
        router.push("/");
      }
    }
  };
  if (user && user.isLoading) return <Loading />;

  if (user && user.isAuthenticated) return router.push("/");

  return (
    <section className="max-w-[1440px] m-auto">
      <div className="flex gap-6 flex-col w-[600px] h-[600px] p-6">
        <h1 className="text-5xl font-semibold text-blue-950 ">Login</h1>
        <div>
          <span>Don't have an account yet?</span>
          <span>
            <Link
              href={"/register"}
              className="pl-2 text-blue-500 underline cursor-pointer hover:text-blue-700"
            >
              Sign Up
            </Link>
          </span>
        </div>

        <div className="border-solid border-2 rounded-full p-3 text-center cursor-pointer w-[400px] hover:bg-gray-400">
          <i className="fa fa-google text-red-500 pr-2" aria-hidden="true"></i>
          Sign in with Google
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
            value={login.email}
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
          />{" "}
          <span className="text-red-600 text-sm pl-2">
            {validInput.isValidEmail ? "" : textValid}
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
              value={login.password}
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
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
        <button
          className="w-[400px] bg-blue-950 rounded-full cursor-pointer border-solid border-2 py-3 text-white font-bold text-xl hover:bg-slate-400"
          onClick={() => handleLogin()}
        >
          Login
        </button>
      </div>
    </section>
  );
};

export default Login;
