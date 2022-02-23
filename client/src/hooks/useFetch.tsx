import axios from "axios";
import { useEffect, useState } from "react";

interface Props {
    url: string;
}

const useFetch = ({ url }: Props) => {
    const [data, SetData] = useState(null);
    const [loading, SetLoading] = useState(true);
    const [error, SetError] = useState(null);

    useEffect(() => {
        axios
            .get(url)
            .then((res) => {
                SetData(res.data);
                console.log(res.data);
                SetLoading(false);
            })
            .catch((err) => {
                SetError(err);
                SetLoading(false);
            });
    }, []);

    return { data, loading, error };
};

export default useFetch;
