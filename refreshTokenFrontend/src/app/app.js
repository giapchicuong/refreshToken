import React, { useContext } from "react";
import AppNav from "@/components/app.nav";
import AppFooter from "@/components/app.footer";
import { UserContext } from "@/context/UserContext";
import Loading from "@/components/loading";
const App = ({ children }) => {
  const { user } = useContext(UserContext);
  return (
    <body>
      <section className="max-container ">
        {user && user.isLoading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <AppNav />
            {children}
            <AppFooter />
          </>
        )}
      </section>
    </body>
  );
};

export default App;
