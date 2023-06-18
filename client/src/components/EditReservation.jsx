import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
function EditReservation() {
  const navigate = useNavigate();
  const [{data: reservation, error, status}, setReservation] = useState({
    data: null,
    error: null,
    status: "pending",
  });
  const {id} = useParams();
  const [customers, setCustomers] = useState([]);
  const [locations, setLocations] = useState([]);
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    party_name: "",
    customer_id: "0",
    location_id: "0",
    reservation_date: "",
    party_size: "",
  });
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

  const getReservation = async () => {
    const response = await fetch(`/reservations/${id}`);
    if (response.ok) {
      const reservationJSON = await response.json();
      setReservation({data: reservationJSON, error: null, status: "resolved"});
      setFormData({
        party_name: reservationJSON.party_name,
        customer_id: parseInt(reservationJSON.customer_id),
        location_id: parseInt(reservationJSON.location_id),
        reservation_date: reservationJSON.reservation_date,
        party_size: parseInt(reservationJSON.party_size),
      });
    } else {
      const err = await response.json();
      setReservation({data: null, error: err, status: "rejected"});
    }
  };

  useEffect(() => {
    getReservation().catch(console.error);
  }, [id]);

  function handleChange(event) {
    const name = event.target.name;
    let value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    if (
      name === "customer_id" ||
      name === "location_id" ||
      name === "party_size"
    ) {
      value = parseInt(value);
    }
    setFormData({...formData, [name]: value});
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFormData({
      party_name: event.target.party_name.value,
      customer_id: parseInt(event.target.customer_id.value),
      location_id: parseInt(event.target.location_id.value),
      reservation_date: event.target.reservation_date.value,
      party_size: parseInt(event.target.party_size.value),
    });
    fetch(`/reservations/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then(response => {
      if (response.status !== 200) {
        console.log(response);
        setErrors([response.status, response.statusText]);
      } else if (response.ok) {
        response.json().then(reservation => {
          setFormData({
            party_name: "",
            customer_id: "0",
            location_id: "0",
            date: "",
            party_size: "",
          });
        });
        navigate("/");
      } else {
        response.json().then(error => setErrors(error.errors));
      }
    });
  }

  const displayCustomerSelect = customers.map(customer => (
    <option value={customer.id} key={customer.id}>
      {customer.name}
    </option>
  ));
  const displayLocationSelect = locations.map(location => (
    <option value={location.id} key={location.id}>
      {location.name}
    </option>
  ));
  if (status === "pending") return <h2>Loading...</h2>;
  if (status === "rejected") return <h2>Error: {error.error}</h2>;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <h2 className="text-2xl text-center">Add New Reservation</h2>
      <div className="flex flex-row justify-between items-center">
        <label htmlFor="party_name">Party Name</label>
        <input
          type="text"
          id="party_name"
          name="party_name"
          value={formData.party_name}
          onChange={event => handleChange(event)}
          className="input input-bordered input-xs input-primary w-64 "
        />
      </div>
      <div className="flex flex-row justify-between items-center">
        <label htmlFor="customer">Customer</label>
        <select
          name="customer_id"
          id="customer_id"
          onChange={handleChange}
          className="select select-primary select-xs w-64"
          defaultValue={formData.customer_id}>
          {displayCustomerSelect}
        </select>
      </div>

      <div className="flex flex-row justify-between items-center">
        <label htmlFor="location">Location</label>
        <select
          name="location_id"
          id="location_id"
          onChange={handleChange}
          className="select select-primary select-xs w-64"
          defaultValue={formData.location_id}>
          <option value="0">Choose a location</option>
          {displayLocationSelect}
        </select>
      </div>
      <div className="flex flex-row justify-between items-center">
        <label htmlFor="party_size">Party size</label>
        <input
          type="number"
          id="party_size"
          name="party_size"
          value={formData.party_size}
          onChange={event => handleChange(event)}
          className="input input-bordered input-xs input-primary w-64"
        />
      </div>
      <div className="flex flex-row justify-between items-center">
        <label htmlFor="reservation_date">Date</label>
        <input
          type="date"
          id="reservation_date"
          name="reservation_date"
          value={formData.reservation_date}
          onChange={event => handleChange(event)}
          className="input input-bordered input-xs input-primary w-64"
        />
      </div>
      {errors.map(error => (
        <p key={error} style={{color: "red"}}>
          {error}
        </p>
      ))}
      <button type="submit" className="btn btn-success btn-sm">
        Submit
      </button>
    </form>
  );
}

export default EditReservation;
