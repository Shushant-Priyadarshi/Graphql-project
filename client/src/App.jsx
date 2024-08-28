
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import HomePage from "./components/HomePage"
import AddUsers from "./components/AddUsers"
import AllOrders from "./components/AllOrders"
import AllUsers from "./components/AllUsers"
import CreateOrders from "./components/CreateOrders"

function App() {
  const router = createBrowserRouter([
    {path:"/",
      element:<HomePage/>
    },
    {
      path:"/AddUser",
      element:<AddUsers/>
    },
    {
      path:"/getUsers",
      element:<AllUsers/>
    },
    {
      path:"/createOrder/:Id",
      element:<CreateOrders/>
    },
    {
      path:"/getOrders",
      element:<AllOrders/>
    }
  ])
 
  return (
   <RouterProvider router={router} />
  )
}

export default App
