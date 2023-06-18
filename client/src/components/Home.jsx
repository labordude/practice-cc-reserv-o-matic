import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Customers from "./Customers";
import Locations from "./Locations";
import Reservations from "./Reservations";

import "../App.css";

import NewCustomer from "./NewCustomer";
import NewReservation from "./NewReservation";

function Home() {
  const [customers, setCustomers] = useState([]);
  const [locations, setLocations] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [showForms, setShowForms] = useState(false);
  useEffect(() => {
    fetch("/customers")
      .then(r => r.json())
      .then(customers => setCustomers(customers));
  }, []);

  useEffect(() => {
    fetch("/locations")
      .then(r => r.json())
      .then(locations => setLocations(locations));
  }, []);
  useEffect(() => {
    fetch("/reservations")
      .then(r => r.json())
      .then(reservations => setReservations(reservations));
  }, []);

  function onDeleteReservation(id) {
    const updatedReservations = reservations.filter(
      reservation => reservation.id !== id,
    );
    setReservations(updatedReservations);
  }
  function toggleForms() {
    setShowForms(prevShowForms => !prevShowForms);
  }

  function onAddNewCustomer(newCustomer) {
    setCustomers(customers => [newCustomer, ...customers]);
  }
  function onAddNewReservation(newReservation) {
    setReservations(reservations => [newReservation, ...reservations]);
  }
  function onEditReservation(updatedReservation) {
    const updatedReservations = reservations.map(reservation =>
      reservation.id === updatedReservation.id
        ? updatedReservation
        : reservation,
    );
    setReservations(updatedReservations);
  }
  return (
    <main className="flex flex-col w-full justify-center align-middle items-center mx-auto">
      {showForms ? (
        <div
          className="flex flex-row w-full items-sta justify-center h-fit"
          id="forms">
          <div className="w-1/3 h-fit">
            <NewCustomer onAddNewCustomer={onAddNewCustomer} />
          </div>
          <div className="divider divider-horizontal">OR</div>
          <div className="h-fit w-1/3">
            <NewReservation
              customers={customers}
              locations={locations}
              onAddNewReservation={onAddNewReservation}
            />
          </div>
        </div>
      ) : null}

      <div className="flex w-full justify-center items-center">
        <Customers customers={customers} toggleForms={toggleForms} />
      </div>
      <div className="divider my-4"></div>
      <div className="flex w-full justify-center items-center">
        <Locations locations={locations} />
      </div>
      <div className="divider my-4"></div>
      <div className="flex w-full justify-center items-center">
        <Reservations
          reservations={reservations}
          onDeleteReservation={onDeleteReservation}
          onEditReservation={onEditReservation}
          toggleForms={toggleForms}
        />
      </div>
    </main>
  );
}

export default Home;
