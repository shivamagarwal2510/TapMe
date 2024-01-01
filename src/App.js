import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { Route, Routes, Navigate } from "react-router-dom";
import { UserContext } from "./contexts/user.context";
import { useContext } from "react";

function App() {
const {currentUser} = useContext(UserContext);

const PrivateRoute = ({children})=>{
  if(currentUser){
    return children;
  }
  else{
    return (<Navigate to="/login"/>)
  }
}
console.log(currentUser);
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route index element={
            <PrivateRoute>
            <Home />
            </PrivateRoute>
          } />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
