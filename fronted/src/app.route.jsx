import { createBrowserRouter } from "react-router";

import Login from "../src/features/auth/pages/login";
import Register from "../src/features/auth/pages/register";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
