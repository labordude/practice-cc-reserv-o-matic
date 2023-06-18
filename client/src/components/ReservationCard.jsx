import React from "react";
import {Link} from "react-router-dom";
function ReservationCard({
  reservation,
  onDeleteReservation,
  onEditReservation,
}) {
  function handleDeleteReservation() {
    fetch(`/reservations/${reservation.id}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
    }).then(response => {
      if (response.ok) {
        onDeleteReservation(reservation.id);
      }
    });
  }
  return (
    <tr>
      <td>{reservation.id}</td>
      <td>{reservation.party_name}</td>
      <td>{reservation.customer.name}</td>
      <td>{reservation.location.name}</td>
      <td>{reservation.party_size}</td>
      <td>
        <Link to={`/reservations/${reservation.id}`}>
          <button className="btn btn-sm btn-primary">Edit</button>{" "}
        </Link>
        <button
          className="btn btn-sm btn-error"
          onClick={() => handleDeleteReservation()}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default ReservationCard;
