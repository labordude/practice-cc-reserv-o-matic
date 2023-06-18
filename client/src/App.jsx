import {Route, Routes} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import EditReservation from "./components/EditReservation";
import Home from "./components/Home";
function App() {
  return (
    <div className="flex flex-col w-full justify-center align-middle items-center mx-auto">
      <Header />
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/reservations/:id/*" element={<EditReservation />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
