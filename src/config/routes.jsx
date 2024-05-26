import { createBrowserRouter } from "react-router-dom";
import App from "../app";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import SignupPage from "../pages/signup";
import RequireAuth from "../components/require-auth";
import Product from "../components/product";
import Orders from "../pages/orders";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          {
            path: "/orders",
            element: <Orders />,
          },
        ],
      },
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/product/:productId",
        element: <Product />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
    ],
  },
]);

export default router;
