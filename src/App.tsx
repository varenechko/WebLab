import "./App.css";
import { sendGetRequest } from "./axios/hooks";
import { OrderList } from "./components/OrderList";
import { useEffect, useState } from "react";
import { IOrder } from "./axios/interfaces";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { OrderCreation } from "./components/OrderCreation";

function App() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  useEffect(() => {
    const getOrders = async () => {
      const allOrders = await sendGetRequest("order/GetAll");
      if (allOrders) setOrders(allOrders);
    };
    getOrders();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<OrderList orders={orders} setOrders={setOrders} />}
        />
        <Route
          path="create-order/:id"
          element={<OrderCreation orders={orders} setOrders={setOrders} />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
