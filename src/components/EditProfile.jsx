import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

function EditProfile({ user}) {
    const [ firstName, setFirstName ] = useState(user?.firstName);
    const [ lastName, setLastName ] = useState(user?.lastName);
    const [ age, setAge ] = useState(user?.age);
    const [ gender, setGender ] = useState(user?.gender);
    const [about , setAbout ] = useState(user?.about);
    const [ skills, setSkills]  = useState(user?.skills || [])
    const [photoUrl, setPhotoUrl ] = useState(user?.photoUrl)
    const dispatch = useDispatch()
    const [ error , setError]  = useState("")
    const [ showToast, setShowToast ] = useState(false)

    const saveProfile = async() => {
        try {
            setError("")
            const res = await axios.patch(BASE_URL+"/profile/edit" , { firstName, lastName, age, gender, about, photoUrl, skills }, { withCredentials: true})
            dispatch(addUser(res.data.data))
            setShowToast(true)
            setTimeout(()=> setShowToast(false), 3000)

        } catch (error) {
            setError(error.response.data)
        }
    }

  return (
    <>
    <div className="flex justify-center my-10">
    <div className="flex justify-center mx-10">
        <div className="card card-dash bg-base-200 w-96">
        <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <div className="py-4">
                <fieldset className="fieldset">
                    <label className="label" htmlFor="firstName">First Name </label>
                    <input 
                        type="text"
                        value={firstName} 
                        className="input"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </fieldset>
                <fieldset className="fieldset">
                    <label className="label" htmlFor="lastName">Last Name </label>
                    <input 
                        type="text"
                        value={lastName} 
                        className="input"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </fieldset>
                <fieldset className="fieldset">
                    <label className="label" htmlFor="photoUrl">Photo Url </label>
                    <input 
                        type="text"
                        value={photoUrl} 
                        className="input"
                        onChange={(e) => setPhotoUrl(e.target.value)}
                    />
                </fieldset>
                <fieldset className="fieldset">
                    <label className="label" htmlFor="age">Age </label>
                    <input 
                        type="text"
                        value={age} 
                        className="input"
                        onChange={(e) => setAge(e.target.value)}
                    />
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Gender</legend>
                    <select defaultValue={gender || "male"} className="select" onChange={(e) => setGender(e.target.value)}>
                        <option disabled={true}>Pick a gender</option>
                        <option>male</option>
                        <option>female</option>
                        <option>others</option>
                    </select>
                    <span className="label">Optional</span>
                </fieldset>
                <fieldset className="fieldset">
                <legend className="fieldset-legend">About</legend>
                <textarea className="textarea h-24"  onChange={(e) => setAbout(e.target.value)} placeholder="About">{about}</textarea>
                <div className="label">Optional</div>
                </fieldset>
            </div>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
            </div>
        </div>
        </div>
    </div>
    
    <UserCard user={{ firstName, lastName, age, gender, about, photoUrl, skills }} />
    </div>
    {showToast && 
        <div className="toast toast-top toast-center">
    
    <div className="alert alert-success">
        <span>Profile edit successfully.</span>
    </div>
    </div> }
    </>
  )
}

export default EditProfile