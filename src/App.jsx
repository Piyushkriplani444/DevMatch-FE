import { Provider } from "react-redux";
import Body from "./components/Body"
import Login from './components/login'
import Profile from './components/Profile'
import appStore from "./utils/appStore";
import { BrowserRouter, Routes, Route } from "react-router";
import Feed from "./components/feed";
import Connections from "./components/Connections";
import Requests from './components/Requests'
function App() {

  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />} > 
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
          </Route>
        </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
