import Body from "./Body"
import Login from './login'
import Profile from './Profile'
import { BrowserRouter, Routes, Route } from "react-router";
function App() {

  return (
    <>
    <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />} > 
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile/>} />
          </Route>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
