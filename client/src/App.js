import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PredictIntent from "./components/PredictIntent";

function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${"https://www.ionos.ca/digitalguide/fileadmin/DigitalGuide/Teaser/e-commerce.jpg"})`,
      }}
      className="container"
    >
      <div className="overlay">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path="/predict" element={<PredictIntent />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
