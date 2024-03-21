import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import './map.css'
import L from "leaflet";

import 'leaflet/dist/leaflet.css';
export default function Vehicle() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext()

  useEffect(() => {
    getVehicles();
  }, [])

  const onDeleteClick = Vehicle => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return
    }
    axiosClient.delete(`/vehicles/${Vehicle.id}`)
      .then(() => {
        setNotification('vehicles was successfully deleted')
        getVehicles()
      })
  }

  const getVehicles = () => {
    setLoading(true)
    axiosClient.get('/vehicles')
      .then(({ data }) => {
        setLoading(false)
        setVehicles(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }
  const position = [36.8065, 10.1815];
  return (
    <>
     <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Vehicles</h1>
        <Link className="btn-add" to="/vehicles/new">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Registration number</th>
            <th>Fuel card number</th>
            <th>insurance</th>
            <th>taxe</th>
            <th>Actions</th>

          </tr>
          </thead>
          {loading &&
            <tbody>
            <tr>
              <td colSpan="5" className="text-center">
                Loading...
              </td>
            </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
            {vehicles.map(u => (
              <tr key={u.id}>
                <td>{u.make}</td>
                <td>{u.model}</td>
                <td>{u.year}</td>
                <td>{u.registration_number}</td>
                <td>{u.fuel_card_number}</td>
                <td>{u.insurance_payment_due_date}</td>
                <td>{u.tax_payment_due_date}</td>
                <td>
                  <Link className="btn-edit" to={'/vehicles/'+ u.id}>Edit</Link>
                  &nbsp;
                  <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Delete</button>
                </td>
              </tr>
            ))}
            </tbody>
          }
        </table>
      </div>
    </div>
    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={position}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
    </>
   
    
  )
}
