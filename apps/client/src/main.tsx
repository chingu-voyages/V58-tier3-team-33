import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./features/auth/pages/LandingPage.tsx";
import { HomePage } from "./features/client/pages/HomePage.tsx";
import { PostGigPage } from "./features/client/pages/PostGigPage.tsx";
import FreelancerDashboardPage from "./features/freelancer/pages/FreelancerDashboardPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/client",
    element: <HomePage />,
  },
  {
    path: "/client/post-gig",
    element: <PostGigPage />,
  },
  {
    path: "/freelancer",
    element: <FreelancerDashboardPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
