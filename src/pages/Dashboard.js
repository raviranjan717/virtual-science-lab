import React, { Fragment, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import Community from "../components/Community/Community";
import Conversession from "../components/Conversession/Conversession";
import HeaderBar from "../components/Dashboard/Header/HeaderBar";
import SideBar from "../components/Dashboard/Header/SideBar";
import Profile from "../components/Dashboard/Profile/Profile";
import BioSimulationTemplate from "../components/Dashboard/Simulation/BioSimulationTemplate";
import CheSimulationTemplate from "../components/Dashboard/Simulation/CheSimulationTemplate";
import SimulationsBio from "../components/Dashboard/Simulation/SimulationsBio";
import SimulationsChe from "../components/Dashboard/Simulation/SimulationsChe";
import SimulationsPhy from "../components/Dashboard/Simulation/SimulationsPhy";
import SimulationTemplate from "../components/Dashboard/Simulation/SimulationTemplate";
import Welcome from "../components/Dashboard/Welcome/Welcome";
import Labroom from "../components/Labroom/Labroom";
import Noticeboard from "../components/Noticeboard/Noticeboard";
import Workshop from "../components/Workshop/Workshop";
import useWindowDimensions from "../utils/useWindowDimensions";

const Dashboard = () => {
  const { page } = useParams();

  document.title = "Virtual Science Lab 🚀";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // get device width from custom hooks
  const { width } = useWindowDimensions();

  let notificationWidth =
    width > 500 ? "480px" : width > 400 ? "390px" : "370px";

  return (
    <Fragment>
      <div className="flex h-screen overflow-hidden">
        {/* For Toast Notification */}
        <Toaster
          toastOptions={{
            duration: 7000,
            style: {
              minWidth: `${notificationWidth}`,
              fontFamily: "sans-serif",
              zIndex: 999,
            },
          }}
        />
        {/*  Site Bar*/}
        <SideBar />
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <HeaderBar />

          <main className="px-4 sm:px-6 py-6 max-w-9xl mx-auto bg-gray-50 h-full w-full comment-scroll overflow-y-scroll">
            {page === "simulation-phy" ? (
              <SimulationsPhy />
            ) : page === "simulation-che" ? (
              <SimulationsChe />
            ) : page === "simulation-bio" ? (
              <SimulationsBio />
            ) : page === "community" ? (
              <Community />
            ) : page === "labroom" ? (
              <Labroom />
            ) : page === "dashboard" ? (
              <Welcome />
            ) : page === "noticeboard" ? (
              <Noticeboard />
            ) : page === "workshop" ? (
              <Workshop />
            ) : page === "messages" ? (
              <Conversession />
            ) : page === "profile" ? (
              <Profile />
            ) : page ===
              "Meter-Bridge-Using-No-Wire-Relative-Resistance-Diagnosis" ? (
              <SimulationTemplate />
            ) : page ===
              "Determination of the amount of ferrous ions in a solution of unknown concentration by KMnO₄ solution" ? (
              <CheSimulationTemplate />
            ) : page ===
              "Testing the essentiality of chlorophyll and light in photosynthesis" ? (
              <BioSimulationTemplate />
            ) : null}
          </main>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
