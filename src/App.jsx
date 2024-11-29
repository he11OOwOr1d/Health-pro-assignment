import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import ResultPage from "./components/ResultPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
};

export default App;
