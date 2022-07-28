import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Homepage from "./Pages/Homepage";
import Chartpage from "./Pages/Chartpage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/coins/:id" element={<Chartpage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
