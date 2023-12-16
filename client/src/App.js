import AutoSlider from "./Fivecategories/AutoSlider/AutoSlider.js";
import Foodpage from "./Fivecategories/Foodpage/Foodpage.js";
import Login from "./LoginPopUP/LoginPopUp.js";
import Homepage from "./homepage";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import BookMarkpage from "./BookMarkPage/BookMarkpage.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Foodpage" element={<Foodpage />} />
        <Route path="/AutoSlider/:id" element={<AutoSlider />} />
        <Route path="/BookMarkpage" element={<BookMarkpage />} />
        <Route path="*" element={<Navigate to="/" />} ></Route>

      </Routes>
    </BrowserRouter>

  );
}

export default App;
