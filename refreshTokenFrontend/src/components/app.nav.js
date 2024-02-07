"user client";
import { UserContext } from "@/context/UserContext";
import { logoutUser } from "@/services/loginRegisterServices";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import Image from "next/image";
import ModalNav from "./ModalNav";
const AppNavbar = () => {
  const pathname = usePathname();
  const { user, logoutContext } = useContext(UserContext);
  const [isShowModal, setIsShowModal] = useState(false);

  const links = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Contact",
      link: "/contact",
    },
    {
      name: "Users",
      link: "/users",
    },
  ];

  const handleLogout = async () => {
    const res = await logoutUser();
    if (res && res.EC === 0) {
      logoutContext();
    }
  };

  const handleShowModal = async () => {
    setIsShowModal(!isShowModal);
  };


  if (pathname === "/login" || pathname === "/register") return <></>;
  return (
    <nav className="flex justify-between items-center h-[120px] w-full">
      <Link href={"/"}>
        <div className="text-5xl text-[#004DD5] font-medium cursor-pointer hover:scale-105 transition-all">
          Website
        </div>
      </Link>
      <div className="lg:flex justify-between gap-10 font-medium text-xl cursor-pointer text-gray-500 hidden">
        {links.map((link) => {
          return (
            <Link
              href={link.link}
              key={link.name}
              className="hover:text-blue-950 hover:scale-110 transition-all"
            >
              {link.name}
            </Link>
          );
        })}
      </div>
      {user && user.isAuthenticated ? (
        <>
          <div class="flex flex-wrap justify-center items-center ">
            <div class="relative ml-3 group " data-te-dropdown-ref>
              <div className="flex cursor-pointer items-center min-w-20 ">
                <Image
                  src={`/images/${user.account.avatar}`}
                  width="32"
                  height="32"
                  alt="Avatar"
                  loading="lazy"
                  className="h-10 w-10  rounded-full border-2 animate-pulse"
                />
                <div className="pl-2 ">
                  <i class="fa fa-angle-down" aria-hidden="true"></i>
                </div>
              </div>
              <ul
                className={`group-hover:block hidden cursor-pointer absolute left-[-140px] right-auto z-[1000] float-left m-0 min-w-[12rem] list-none overflow-hidden rounded-lg border shadow  bg-white bg-clip-padding text-left text-base shadow-l`}
                aria-labelledby="dropdownMenuButton2"
                data-te-dropdown-menu-ref
              >
                <li>
                  <div className="cursor-auto block w-full whitespace-nowrap bg-transparent px-4 py-4 text-sm font-normal text-black border-dotted border-b border-neutral-500 ">
                    {user.account.email}
                  </div>
                </li>
                <li onClick={() => handleShowModal()}>
                  <div className="cursor-pointer block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-black hover:bg-gray-100">
                    Change information
                  </div>
                </li>
                <li>
                  <div className="cursor-pointer block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-black hover:bg-gray-100">
                    Settings
                  </div>
                </li>
                <li>
                  <div
                    class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-black hover:bg-gray-100"
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
          <Link href={"/login"}>
            <button className="lg:block hidden w-[250px] h-[50px] bg-[#0054D9] text-white font-semibold text-xl rounded-full hover:bg-blue-300 hover:text-black hover:scale-110 transition-all ">
              Sign In / Sign Up
            </button>
          </Link>
        </>
      )}
      <ModalNav show={isShowModal} onHide={handleShowModal} />
    </nav>
  );
};

export default AppNavbar;
