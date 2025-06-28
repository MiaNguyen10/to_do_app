import ProtectedRoute from "@/middlewares/ProtectedRoute";
import Login from "@/pages/Auth/Login";
import SignUp from "@/pages/Auth/SignUp";
import Profile from "@/pages/Profile/Profile";
import TodoCreate from "@/pages/ToDo/TodoCreate";
import TodoDetail from "@/pages/ToDo/TodoDetail";
import ToDos from "@/pages/ToDo/ToDos";
import TodoUpdate from "@/pages/ToDo/TodoUpdate";
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
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <ToDos />,
      },
      {
        path: "/tasks/:task_id",
        element: <TodoDetail />,
      },
      {
        path: "/tasks/:task_id/edit",
        element: <TodoUpdate />,
      },
      {
        path: "/tasks/create",
        element: <TodoCreate />,
      },
      {
        path: "/profile",
        element: <Profile />
      }
    ],
  },
]);

export default router;
