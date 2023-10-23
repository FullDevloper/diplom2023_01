import Home from "./pages/Home";
// import ChatIcon from "./svg/Chat";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";
// import { useDispatch } from "react-redux";
// import { logout } from "./features/userSlice";
function App() {
  // const dispatch =useDispatch();
  return (
    <div className="dark">
{/* <button onClick={()=>{dispatch(logout())}}>Гарах</button> */}
<Router>

  <Routes>
    <Route exact
     path="/" element={<Home/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/register" element={<Register/>}/>
  </Routes>
</Router>
    </div>

  );
}

export default App;
