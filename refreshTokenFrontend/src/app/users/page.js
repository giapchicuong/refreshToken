"use client";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { deleteUser, getAllUser } from "@/services/userServices";
import Loading from "../../components/loading";
import TableUser from "./TableUser";
const Users = () => {
  const { user } = useContext(UserContext);
  const [userList, setUserList] = useState([]);
  const [dataModal, setDataModal] = useState({});
  const [action, setAction] = useState("CREATE");
  const [isShowModalUser, setIsShowModalUser] = useState(false);

  const router = useRouter();

  const handleGetAllUser = async () => {
    const res = await getAllUser();
    if (res && res.EC === 0) {
      setUserList(res.DT);
    }
  };
  useEffect(() => {
    handleGetAllUser();
  }, []);

  const handleEdit = (item) => {
    setIsShowModalUser(!isShowModalUser);
    setDataModal(item);
    setAction("UPDATE");
  };

  const handleCloseModalUser = () => {
    setIsShowModalUser(!isShowModalUser);
    handleGetAllUser();
  };
  const handleAddUser = () => {
    setAction("CREATE");
    setDataModal("");
    setIsShowModalUser(!isShowModalUser);
  };

  const handleDeleteUser = async (item) => {
    const res = await deleteUser(item);
    if (res && res.EC === 0) {
      handleGetAllUser();
    }
  };

  if (user && !user.isAuthenticated) return router.push("/login");

  return (
    <div>
      <>
        <div className="flex flex-col">
          <button
            className="bg-slate-200 w-52 h-12 rounded-full hover:bg-red-300 hover:text-white transition-all flex items-center justify-center gap-2 hover:scale-110"
            onClick={() => handleAddUser()}
          >
            <div className="text-blue-950">
              <i class="fa fa-plus i" aria-hidden="true"></i>
            </div>
            <div>ADD NEW USER</div>
          </button>
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table class="min-w-full text-left text-sm font-light">
                  <thead>
                    <tr>
                      <th scope="col" class="px-6 py-4">
                        ID
                      </th>
                      <th scope="col" class="px-6 py-4">
                        Email
                      </th>
                      <th scope="col" class="px-6 py-4">
                        Username
                      </th>
                      <th scope="col" class="px-6 py-4">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <>
                      {userList &&
                        userList.length > 0 &&
                        userList.map((item) => {
                          return (
                            <tr
                              key={`user-list-${item.id}`}
                              className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-gray-200"
                            >
                              <td className="whitespace-nowrap px-6 py-4 font-medium">
                                {item.id}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 ">
                                {item.email}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 ">
                                {item.username}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4  flex gap-5 ">
                                <div
                                  className="text-orange-500 cursor-pointer hover:scale-110 transition-all"
                                  onClick={() => handleEdit(item)}
                                >
                                  <i
                                    class="fa fa-pencil i"
                                    aria-hidden="true"
                                  ></i>
                                </div>
                                <div
                                  className="text-red-500 cursor-pointer hover:scale-110 transition-all"
                                  onClick={() => handleDeleteUser(item)}
                                >
                                  <i
                                    class="fa fa-trash i"
                                    aria-hidden="true"
                                  ></i>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <TableUser
          show={isShowModalUser}
          onHide={handleCloseModalUser}
          dataModalUser={dataModal}
          actionModalUser={action}
        />
      </>
    </div>
  );
};

export default Users;
