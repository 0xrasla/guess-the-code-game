import { TailSpin } from "react-loader-spinner";

export const Loading = () => {
    return (
        <div id="loading" className="loading">
            <TailSpin width="200" color="grey" ariaLabel="loading" />
        </div>
    );
};
