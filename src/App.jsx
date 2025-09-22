import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import About from "./pages/About";
import Editor from "./pages/Editor";
import Preview from "./pages/Preview";
import { useContext } from "react";
import { PageContext } from "./context/PageContext";
import "./App.css";

function App() {
  const { addBlock } = useContext(PageContext);

  return (
    <div className="app-layout">
      <Sidebar addBlock={addBlock} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Editor />} />
          <Route path="/about" element={<About />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/editor/:pageId" element={<Editor />} />
          <Route path="/preview/:pageId" element={<Preview />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;






