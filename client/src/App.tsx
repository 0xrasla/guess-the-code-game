import "./App.scss";
import useFetch from "./hooks/useFetch";
import { Gist } from "./components/Gist";
import { Loading } from "./components/Loading";

function App() {
    const url = process.env.REACT_APP_URL || "";
    const { data, error, loading } = useFetch({ url: url });

    if (loading) return <Loading />;

    return (
        <div className="App">
            <h1>Code Make Good</h1>
            <Gist />
        </div>
    );
}

export default App;
