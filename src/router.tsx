import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Landing from "./pages/Landing.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />, // La page principale sera Landing
  },
  {
    path: "/home",
    element: <App />, // Home sera sous "/home"
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

export default router;
