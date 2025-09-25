import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import About from "./pages/About";
import Editor from "./pages/Editor";
import Preview from "./pages/Preview";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useContext } from "react";
import { PageContext } from "./context/PageContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Page from "./components/Page";
import "./App.css";

function App() {
  const { addBlock } = useContext(PageContext);
  const location = useLocation(); // get current route

  // Don't show sidebar on login/register
  const hideSidebar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="app-layout">
      {!hideSidebar && <Sidebar addBlock={addBlock} />}
      <div className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
           <Route path="/page/:pageId" element={<Page />} />
          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Editor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editor/:pageId"
            element={
              <ProtectedRoute>
                <Editor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/preview"
            element={
              
                <Preview />
             
            }
          />
          <Route
            path="/preview/:pageId"
            element={
              <ProtectedRoute>
                <Preview />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;








