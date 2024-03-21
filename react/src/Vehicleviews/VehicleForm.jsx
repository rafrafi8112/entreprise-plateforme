import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";
import Loading from '../views/Loading.jsx'; 
export default function VehicleForm() {
    const navigate = useNavigate();
    let {id} = useParams();
    const [vehicle, setVehicle] = useState({
      id: null,
      make: '',
      model: '',
      year: '',
      registration_number: '',
      fuel_card_number: '',
      insurance_payment_due_date: '',
      tax_payment_due_date: '',
    })
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const {setNotification} = useStateContext()

    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/vehicles/${id}`)
                .then(({data}) => {
                    setLoading(false)
                    setVehicle(data.data)
                })
                .catch(() => {
                    setLoading(false)
                })
        }, [])
    }

    const onSubmit = ev => {
        console.log(vehicle);
        ev.preventDefault()
        if (vehicle.id) {

            axiosClient.put(`/vehicles/${vehicle.id}`, vehicle)

                .then(() => {
                    setNotification('vehicles was successfully updated')
                    navigate('/vehicles')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        } else {
            console.log('Updating vehicles with data:', vehicle);

            axiosClient.post('/vehicles', vehicle)
                .then(() => {
                    setNotification('vehicles was successfully created')
                    navigate('/vehicles')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        }
    }

    return (
      <>
      {vehicle.id && <h1>Update VEHICULE: {vehicle.make}</h1>}
           {!vehicle.id && <h1>New Vehicule</h1>}
           <div className="card animated fadeInDown">
               {loading && (
                   <div className="text-center">
                      <Loading message="Loading rooms..." />
                   </div>
               )}
               {errors &&
                   <div className="alert">
                       {Object.keys(errors).map(key => (
                           <p key={key}>{errors[key][0]}</p>
                       ))}
                   </div>
               }
       {!loading && (
         <form onSubmit={onSubmit}>
           <input value={vehicle.make} onChange={ev => setVehicle({...vehicle, make: ev.target.value})} placeholder="make"/>
           <input value={vehicle.model} onChange={ev => setVehicle({...vehicle, model: ev.target.value})} placeholder="model"/>

           <input value={vehicle.year} onChange={ev => setVehicle({...vehicle, year: ev.target.value})} placeholder="year"/>
           <input value={vehicle.registration_number} onChange={ev => setVehicle({...vehicle, registration_number: ev.target.value})} placeholder="registration_number"/>

           <input value={vehicle.fuel_card_number} onChange={ev => setVehicle({...vehicle, fuel_card_number: ev.target.value})} placeholder="fuel_card_number"/>
           
           <input type="datetime-local" value={vehicle.end_time}
                              onChange={ev => setVehicle({...vehicle, insurance_payment_due_date: ev.target.value})}
                              placeholder="insurance_payment_due_date"/>

           <input type="datetime-local" value={vehicle.tax_payment_due_date}
                                         onChange={ev => setVehicle({...vehicle, tax_payment_due_date: ev.target.value})}
                                         placeholder="tax_payment_due_date"/>
                                         
           <button className="btn">Save</button>
         </form>
       )}
     </div>
   </>
    )
}
