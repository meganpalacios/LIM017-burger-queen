import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './Components/SignIn/SignIn';
import WaiterNav from './Components/WaiterNav/WaiterNav';
import Navigate from './Components/Navigate/Navigate';
import ChefView from './Components/ChefView/ChefView';
import PlaceOrders from './Components/PlaceOrders/PlaceOrders';
import { useState } from "react";

export default function App() {
  
  const [username, setUsername] = useState();

  return(
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignIn username={username} setUsername={setUsername} />} />
          <Route exact path="/navigate" element={<Navigate/>} />
          <Route exact path="/waiter-view" element={<PlaceOrders username={username} />} />
          <Route exact path="/chef-view" element={<ChefView />} />
          <Route exact path="/waiter-view/place-orders" element={<PlaceOrders username={username} />} />
          <Route exact path="/waiter-view/ready-to-serve" element={<WaiterNav />} />
        </Routes>
    </BrowserRouter>
  );
}
