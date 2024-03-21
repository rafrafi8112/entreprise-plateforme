import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";
import Loading from './Loading'; 
import{Multiselect} from 'multiselect-react-dropdown';
import { Upload, message } from "antd";
import { VerticalAlignTopOutlined } from "@material-ui/icons";
import axios from "axios";
export default function RoomForm() {
    const navigate = useNavigate();
    let {id} = useParams();
    const [file, setfile] = useState('')
    const [imageUrl, setImageURL] = useState(false)
    const [room, setRoom] = useState({
        id: null,
        name: '',
        capacity: '',
        description: '',
        image:'',
        available: true
    })

    const serverURL = 'http://localhost:8000'
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => callback(reader.result));
        reader.readAsDataURL(img);
      };
    
      const beforeUpload = (file) => {
        const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
          message.error("You can only upload JPG/PNG file!");
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error("Image must smaller than 2MB!");
        }
        return isJpgOrPng && isLt2M;
      };
    
      const handleChange = async (info) => {
        if (info.file.status === "uploading") {
          setLoading(false);
          return;
        }
        if (info.file.status === "done") {
          getBase64(info.file.originFileObj, (imageUrl) => {
            setLoading(false);
            setImageURL(false);
          });
        }
        try {
          if (info.file.status !== "uploading") {
            console.log("filee", info.file);
    
            var bodyFormData = new FormData();
    
            bodyFormData.append("file", info.file.originFileObj);
            setfile(
            serverURL + "/api/files/" + info?.file.originFileObj.name,
            );
            setImageURL(true);
            await axios({
              method: "post",
              url: serverURL + "/api/upload",
              data: bodyFormData,
              headers: { "Content-Type": "multipart/form-data" },
            });
          }
        } catch (err) {
          console.log(err);
        }
      };

    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const {setNotification} = useStateContext()
    const roomEquipments = [
        { equipment: 'Chairs', id: 1 },
        { equipment: 'Projector', id: 2 },
        { equipment: 'Conference Table', id: 3 },
        { equipment: 'Whiteboard', id: 4 },
        { equipment: 'Video Conferencing System', id: 5 },
        { equipment: 'Flip Chart', id: 6 },
        { equipment: 'Speaker System', id: 7 },
        { equipment: 'Microphone', id: 8 },
        { equipment: 'Television', id: 9 },
        { equipment: 'WiFi Access', id: 10 },
    ];
    const [selectedEquipments, setSelectedEquipments] = useState([]);

    // Update the description when new equipment is selected
    const handleSelect = (selectedList) => {
        setSelectedEquipments(selectedList);
        const equipmentList = selectedList.map(item => item.equipment).join(', ');
        setRoom({ ...room, description: equipmentList });
    };

    // Update the description when equipment is removed
    const handleRemove = (selectedList) => {
        setSelectedEquipments(selectedList);
        const equipmentList = selectedList.map(item => item.equipment).join(', ');
        setRoom({ ...room, description: equipmentList });
    };
    const [options]=useState(roomEquipments);
    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/rooms/${id}`)
                .then(({data}) => {
                    setLoading(false)
                    setRoom(data)
                })
                .catch(() => {
                    setLoading(false)
                })
        }, [])
    }

    const onSubmit = ev => {
        console.log(room);
        ev.preventDefault()
        if (room.id) {

            console.log('eeeeeeeeeeeeeeeeee',file , {...room,image:file})
            axiosClient.put(`/rooms/${room.id}`, {...room,image:file})

                .then(() => {
                    setNotification('Room was successfully updated')
                    navigate('/rooms')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        } else {
            console.log('Updating room with data:', {...room,file});

            axiosClient.post('/rooms', {...room,image:file})
                .then(() => {
                    setNotification('Room was successfully created')
                    navigate('/rooms')
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
            {room.id && <h1>Update User: {room.name}</h1>}
            {!room.id && <h1>New Room</h1>}
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
                    <form onSubmit={onSubmit} className="room-form">
                        <div className="form-group">
                            <label htmlFor="roomName">Name:</label>
                            <input value={room.name} onChange={ev => setRoom({...room, name: ev.target.value})}
                                placeholder="Name"/>
                        </div>
                        
                      
                        <div className="form-group">
                            <label htmlFor="roomEquipments">Descrition:</label>
                            <Multiselect
                                options={roomEquipments}
                                displayValue="equipment"
                                selectedValues={selectedEquipments}
                                onSelect={handleSelect}
                                onRemove={handleRemove}
                                
                            />
                        </div>
                          <div className="form-group">
                                                          
                         <div className="number-input">
                              <label htmlFor="roomCapacity">Capacity:</label>
                              <button
                                type="button"
                                onClick={() => setRoom({ ...room, capacity: Math.max(0, (Number(room.capacity) || 0) - 1) })}
                              >
                                –
                              </button>
                              <input
                                type="number"
                                id="roomCapacity"
                                value={room.capacity}
                                onChange={ev => setRoom({ ...room, capacity: Math.max(0, parseInt(ev.target.value) || 0) })}
                                placeholder="0"
                                min="0" // minimum value
                              />
                              <button
                                type="button"
                                onClick={() => setRoom({ ...room, capacity: (Number(room.capacity) || 0) + 1 })}
                              >
                                +
                              </button>
                            </div>

                                  </div>
                        

                       <Upload
                        name="slideimg"
                        listType="picture-card"
                        className="avatar-uploader projects-uploader"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                      >
                     
                          <div className="ant-upload-text font-semibold text-dark">
                            {
                              <VerticalAlignTopOutlined
                                style={{ width: 20, color: "#000" }}
                              />
                            }
                            <div>Upload New Image</div>
                          </div>
                        
                      </Upload>
                                
                        
                       

                        <button className="btn">Save</button>

                    </form>
                )}
            </div>
        </>
    )
}
