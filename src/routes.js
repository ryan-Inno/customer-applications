import { lazy } from "react";
import { useRoutes } from "react-router-dom";

const Home = lazy(() =>
  import(/* webpackChunkName: "Home" */ "./pages/Home/Home")
);

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/",
      children: [{ path: "", element: <Home /> }],
    },

    { path: "*", element: <div>Not Found</div> },
  ]);
}
