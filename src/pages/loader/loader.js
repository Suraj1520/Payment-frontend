import React from "react";
import { TailSpin } from "react-loader-spinner";

const LoaderComp = () => {

    return (
        <div className="loader">
            <TailSpin
                color="#1f4d91"
                height={30}
                width={30}
                timeout={5000}
            />
        </div>

    );
}
export default LoaderComp;