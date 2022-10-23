import { Suspense } from "react";
import Router from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ----------------------------------------------------------------------

export default function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Router />
      </Suspense>
      <ToastContainer />
    </div>
  );
}
