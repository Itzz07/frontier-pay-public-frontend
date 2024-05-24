import React from "react";
import { useHistory } from "react-router-dom";

function BackButton() {
const history = useHistory();

const handleGoBack = () => {
    history.goBack();
};

return (
    <button onClick={handleGoBack}
    className=" flex justify-center w-52 uppercase bg-[#088F8F] transition delay-100 ease-linear hover:bg-[#369898] text-white text-1xl font-semibold shadow-md drop-shadow-black drop-shadow-xl my-16 px-2 py-4 rounded hover:drop-shadow-none"
    >
        Finish
    </button>
);
}

export default BackButton;
