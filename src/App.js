import logo from './logo.svg';
import './App.css';

import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import SignUp from "./pages/signUp/signup";
import Payments from "./pages/payment/payment";
import Plan from "./pages/plan/plan";
import Pricing from "./pages/pricing/pricing"
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe(process.env.REACT_APP_KEY);
// console.log("stripePromise");
// console.log(stripePromise);
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={< SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/payment" element={<Payments/>} />
        <Route path="/myplan" element={<Plan />} />
      </Routes>
    </div>
  );
}

export default App;
