import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import EventDetails from "../pages/EventDetails";
import Registration from "../pages/Registration";
import NotFound from "../pages/NotFound";
import AllEvents from "../pages/AllEvents";
import AboutUs from "../pages/AboutUs";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<AllEvents />} />
      <Route path="/events/:eventId" element={<EventDetails />} />
      <Route path="/events/:eventId/register" element={<Registration />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;