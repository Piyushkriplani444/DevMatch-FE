import Navbar from "./Navbar"
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch()
  const navitage = useNavigate()
  const userData = useSelector(store => store.user)

  const fetchUser = async( ) =>{
    if(userData) return
    try {
      const res = await axios.get(BASE_URL+"/profile", { withCredentials: true});
      dispatch(addUser(res.data))

    } catch (error) {
      navitage("/login")
      console.log(error)
    }
  }
  useEffect(()=>{
    
  console.log("Not logged in ")
  fetchUser()


  }, []);
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer />
    </div>
  )
}

export default Body