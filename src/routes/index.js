import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Dashboard from "../pages/Dashboard";
import Homepage from "../pages/Homepage";
import SetupTopics from "../pages/SetupTopics";
import RescheduleStudyPlan from '../pages/RescheduleStudyPlan'
import PrivateRoute from "./PrivateRoute";
import My404Component from "../components/404Page/404Page";
const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Homepage />} />
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="proficiency-setup"
          element={
            <PrivateRoute>
              <SetupTopics />
            </PrivateRoute>
          }
        />
        <Route
          path="reschedule"
          element={
            <PrivateRoute>
              <RescheduleStudyPlan />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path='*' exact={true} element={<My404Component/>} />
    </Routes>
  );
};

export default Routers;