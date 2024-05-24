import React from "react";
import cancel from "../assets/cancel.svg";

function Cancel() {
  return (
    <>
      <div className="m-0 p-0  min-h-screen">
        <div className="w-full min-h-[80vh] flex flex-col justify-center items-center">
          <div className="my-10 text-green-600 text-2xl mx-auto flex flex-col justify-center items-center ">
            <img
              src={cancel}
              alt="cancel"
              width={220}
              height={220}
              className="mix-blend-multiply"
            />

            <h3 className="text-4xl pt-20 font-bold text-center text-slate-700">
              Something went wrong
            </h3>

            <a
              href="/"
              className="w-auto uppercase bg-slate-900 text-white text-xl my-16 px-8 py-3 rounded"
            >
              Go To Homepage
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cancel;
