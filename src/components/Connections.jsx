import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react";
import { addConnections } from "../utils/ConnectionSlice";
import { useDispatch, useSelector } from "react-redux";

function Connections() {
    const connections = useSelector(store => store.connections)
    const dispatch = useDispatch()
    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL+"/user/connections", { withCredentials: true});
            console.log(res.data.data)
            dispatch(addConnections(res.data.data))
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=> { 
        fetchConnections()
    }, []);

    if(!connections) return
    if(connections.length ===0 ) return <h1 className="flex justify-center my-10">No connection found</h1>
    
    return (
        <div className="text-center my-10">
            <h1 className="text-bold text-white text-3xl">Connections</h1>
            
        {connections.map((connection) =>{
            const { firstName , lastName, photoUrl, age, gender , about } = connection
            return (
            <div className=" flex  m-4 p-4 border rounded-lg bg-base-300 w-1/2 mx-auto">
             <div>
                <img alt="photo " src={photoUrl} className="w-20 h-20  rounded-full object-contain"/>
             </div>
             <div className="text-left mx-10">
                <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                 <p>{about}</p>
             </div>  
            </div>)
        })}
        </div>
    )
}

export default Connections