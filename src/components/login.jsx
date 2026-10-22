import { useState } from "react"
import axios from "axios";
import { useDispatch } from 'react-redux'
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {

    const [ emailId, setEmailId ] = useState("piyush@gmail.com");
    const [ password, setPassword ] = useState("Piyush@123");
    const [ error , setError]  = useState("")
    const dispatch = useDispatch();
    const navitage = useNavigate();

    const handleLogin = async () =>{
        try {
        const result = await  axios.post( BASE_URL+"/login", { emailId, password }, { withCredentials: true})
        dispatch(addUser(result.data))
        navitage("/")
        }catch(e){
            setError(e?.response?.data || "Something went wrong")
        }
    }

  return (
    <div className="flex justify-center my-10">
        <div className="card card-dash bg-base-200 w-96">
        <div className="card-body">
            <h2 className="card-title justify-center">Login</h2>
            <div className="py-4">
                <fieldset className="fieldset">
                    <label className="label" htmlFor="email">Email ID </label>
                    <input 
                        type="text"
                        value={emailId} 
                        className="input"
                        onChange={(e) => setEmailId(e.target.value)}
                    />
                </fieldset>
                <fieldset className="fieldset my-2">
                    <label className="label" htmlFor="password">Password</label>
                    <input
                        type="password" 
                        value={password} 
                        className="input" 
                        onChange={(e) => setPassword(e.target.value)}    
                    />
                </fieldset>
            </div>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Login