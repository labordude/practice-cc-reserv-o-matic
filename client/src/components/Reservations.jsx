import React from "react";
import ReservationCard from "./ReservationCard";

function Reservations({
  reservations,
  onDeleteReservation,
  toggleForms,
  onEditReservation,
}) {
  const displayReservations = reservations.map(reservation => (
    <ReservationCard
      key={reservation.id}
      reservation={reservation}
      onDeleteReservation={onDeleteReservation}
      onEditReservation={onEditReservation}
    />
  ));
  return (
    <div className="overflow-x-auto h-[250px]">
      <div className="flex flex-row mx-auto gap-2 my-2 justify-center">
        <h2 className="text-2xl">RESERVATIONS</h2>{" "}
        <button className="btn btn-primary btn-sm" onClick={toggleForms}>
          Add New Reservation
        </button>
      </div>
      <table className="table table-xs">
        {/* head */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Purpose</th>
            <th>Customer</th>
            <th>Location</th>
            <th># in party</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{displayReservations}</tbody>
      </table>
    </div>
  );
}

export default Reservations;
