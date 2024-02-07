import { UserContext } from "@/context/UserContext";
import { updateAvatar } from "@/services/userServices";
import { useContext, useState } from "react";

const ModalNav = (props) => {
  const { show, onHide } = props;
  const { user, avatarContext } = useContext(UserContext);
  const [selectedFile, setSelectedFile] = useState("No file chosen");
  const [image, setImage] = useState();

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("email", user.account.email);

    const res = await updateAvatar(formData);

    if (res && res.EC === 0) {
      avatarContext();
      onHide(true);
    }
  };
  const handleOnchangeInput = (e) => {
    setSelectedFile(e.target.files[0].name);
    setImage(e.target.files[0]);
  };
  return (
    <>
      {show ? (
        <>
          <form className="absolute z-10 " onSubmit={handleUpload}>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <h3
                          className="text-base font-semibold leading-6 text-gray-900"
                          id="modal-title"
                        >
                          Change information account
                        </h3>
                        <div className="my-5 flex">
                          <div className="flex gap-5 items-center">
                            <h1 className="min-w-14">Email:</h1>
                            <input
                              type="text"
                              disabled
                              value={user.account.email}
                              className="min-w-[350px] bg-gray-50 py-2 rounded border px-2 
                      "
                            />
                          </div>
                        </div>
                        <div className="my-5 flex ">
                          <div className="flex gap-5 items-center ">
                            <h1 className="min-w-14">Avatar:</h1>
                            <input
                              type="file"
                              id="custom-input"
                              accept="image/*"
                              onChange={handleOnchangeInput}
                              hidden
                            />
                            <label
                              for="custom-input"
                              class="block text-sm text-slate-500 mr-4 py-2 px-4 rounded-md border-0 font-semibold bg-blue-50  hover:bg-blue-100 cursor-pointer"
                            >
                              Choose file
                            </label>
                            <label class="text-sm text-slate-500">
                              {selectedFile}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-900 sm:ml-3 sm:w-auto"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => onHide(true)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default ModalNav;
