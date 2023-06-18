import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Home from "./components/Home.jsx";
import EditReservation from "./components/EditReservation.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {" "}
      <Route index element={<Home />} />
      <Route path="/reservations/:id/*" element={<EditReservation />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
