import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/feedSlice"
import UserCard from "./UserCard"

const Feed = () => {
  const feed = useSelector(store => store.feed)
  const dispatch = useDispatch()
  const getFeed = async() =>{
    if(feed) return
    try {
      const feeds = await axios.get(BASE_URL+ "/user/feed", { withCredentials: true });
      dispatch(addFeed(feeds.data))
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(()=> 
    {
      getFeed()
    },[])


  return (
    feed &&
    <div className="flex justify-center my-10">
      {
        feed.map((data) => (
        
        <UserCard user={data } />
        
        ))
      }
    </div>
  )
}

export default Feed