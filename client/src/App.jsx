import { Route, Routes } from "react-router"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Nav from "./components/UI/Nav"
import Products from "./pages/Products"
import Protect from "./components/UI/utils/Protect"
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Protect><Profile /></Protect>} />
        <Route path="/laptops" element={<Products />} />
      </Routes>

      <ToastContainer position="bottom-right" />
    </>
  )
}

export default App