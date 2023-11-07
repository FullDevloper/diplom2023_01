import Home from "./pages/Home";
// import ChatIcon from "./svg/Chat";

import {BrowserRouter as Router, Routes, Route,Navigate} from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useDispatch,useSelector } from "react-redux";
// import { logout } from "./features/userSlice";
function App() {

  const { user } = useSelector((state) => state.user);
  console.log(user)
  const { token } = user;
  // console.log(access_token)
  return (
    <div className="dark">
{/* <button onClick={()=>{dispatch(logout())}}>Гарах</button> */}
<Router>
          <Routes>
            <Route
              exact
              path="/"
              element={
                token ? <Home  /> : <Navigate to="/login" />
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
    </div>

  );
}

export default App;
