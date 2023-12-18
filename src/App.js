
// import ChatIcon from "./svg/Chat";

import {BrowserRouter as Router, Routes, Route,Navigate} from "react-router-dom"
import {io} from "socket.io-client";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import SocketContext from "./context/SocketContext";
const React_APP_API_ENDPOINT="http://localhost:8001/api/v1"
const socket =io(React_APP_API_ENDPOINT.split("/api/v1")[0])
function App() {

  const { user } = useSelector((state) => state.user);
  console.log(user)
  const { token } = user;
  useEffect(()=>{
    socket.on("receiveMessage",(msg)=>{
      console.log(msg)
    })
  },[])
  const sendMsg=()=>{
    socket.emit("sendMessage","hello how are you")
  }
  // console.log(access_token)
  return (
    <div className="dark">
<SocketContext.Provider value={socket}>
<Router>
          <Routes>
            <Route
              exact
              path="/"
              element={
                token ? <Home socket={socket} /> : <Navigate to="/login" />
              }
            />
            <Route
              exact
              path="/login"
              element={!token ? <Login /> : <Navigate to="/" />}
            />
            <Route
              exact
              path="/register"
              element={!token ? <Register /> : <Navigate to="/" />}
            />
          </Routes>
        </Router>

</SocketContext.Provider>

    </div>

  );
}

export default App;
