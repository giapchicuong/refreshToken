import { UserContext } from "@/context/UserContext";
import { usePathname } from "next/navigation";
import { useContext } from "react";
const AppFooter = () => {
  const { user } = useContext(UserContext);
  const pathname = usePathname();
  if (pathname === "/login" || pathname === "/register") {
    return <></>;
  } else {
    if (user && user.isLoading) return <></>;
    return <footer>AppFooter</footer>;
  }
};

export default AppFooter;
