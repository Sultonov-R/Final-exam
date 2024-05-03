import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import ViewPage from "./pages/ViewPage";
import Error from "./pages/Error";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/viewpage/:id" element={<ViewPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
