import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import About from "./pages/About";
import Editor from "./pages/Editor";
import Preview from "./pages/Preview";

function App() {
  return (
    <div>
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/editor/:pageId" element={<Editor />} />
          <Route path="/preview/:pageId" element={<Preview />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;






