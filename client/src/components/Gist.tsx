import ReactEmbedGist from "react-embed-gist";
import useFetch from "../hooks/useFetch";
import { findRandomGist } from "../utils/Utils";

export const Gist = () => {
    const { data, error, loading } = useFetch({
        url: process.env.REACT_APP_URL || "",
    });

    const selectedGist = findRandomGist(data);
    const {
        id,
        owner: { login },
    } = selectedGist;

    return (
        <>
            <div>Gist</div>
            <ReactEmbedGist gist={`${id}/${login}`} />
        </>
    );
};
