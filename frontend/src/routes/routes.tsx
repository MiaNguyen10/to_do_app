import Login from "@/pages/Auth/Login";
import SignUp from "@/pages/Auth/SignUp";
import ToDos from "@/pages/ToDo/ToDos";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <ToDos />
  },
]);

export default router;
