import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-[100vh]">
      {/* <div class="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute"></div> */}
      <div class="relative flex justify-center items-center">
        <div class="absolute animate-spin rounded-full h-80 w-80 border-t-4 border-b-4 border-purple-500"></div>
        <img
          src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
          class="rounded-full h-52 w-52"
        />
      </div>
    </div>
  );
};

export default Loading;
