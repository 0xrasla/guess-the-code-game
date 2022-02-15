import ReactEmbedGist from "react-embed-gist";
import useFetch from "../hooks/useFetch";
import { findRandomGist } from "../utils/Utils";
import { Audio } from "react-loader-spinner";

export const Gist = () => {
    const { data, error, loading } = useFetch({
        url: process.env.REACT_APP_URL || "",
    });

    return (
        <div>Gist</div>
        // <ReactEmbedGist gist={data} />
    );
};
