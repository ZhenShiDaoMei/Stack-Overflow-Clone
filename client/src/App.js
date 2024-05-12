// ************** THIS IS YOUR APP'S ENTRY POINT. CHANGE THIS FILE AS NEEDED. **************
// ************** DEFINE YOUR REACT COMPONENTS in ./components directory **************
import "./stylesheets/App.css";
import FakeStackOverflow from "./components/fakestackoverflow.js";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home.js";
import Login from "./components/login.js";
import Register from "./components/register.js";

function App() {
  return (
    <div className="fakeso">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/welcome" element={<FakeStackOverflow />} />
      </Routes>
    </div>
  );
}

export default App;
