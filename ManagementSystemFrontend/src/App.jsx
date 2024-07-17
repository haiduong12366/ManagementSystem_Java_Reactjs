import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import Navbar from "./pages/Navbar/Navbar";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import IssueDetails from "./pages/IssueDetails/IssueDetails";
import Subscription from "./pages/Subscription/Subscription";
import Auth from "./pages/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./Redux/Auth/Action";
import { fetchProjects } from "./Redux/Project/Action";
import "./App.css";
import { Toaster } from "react-hot-toast";
import UpgradeSuccess from "./pages/Subscription/UpgradeSuccess";
import AcceptInvitation from "./pages/ProjectCard/AcceptInvitation";


function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);


  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchProjects({}));
  }, [auth.jwt]);

  return (
    <>
      {auth.user ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/project/:id" element={<ProductDetails />} />
            <Route
              path="/project/:projectId/issue/:issueId"
              element={<IssueDetails />}
            />
            <Route path="/upgrade_plan" element={<Subscription />} />
            <Route path="/upgrade_plan/success" element={<UpgradeSuccess />} />
            <Route path="/accept_invitation" element={<AcceptInvitation />} />
          </Routes>
        </>
      ) : (
        <div className="container m-0 max-w-full">
          <Auth /></div>
      )}
      <Toaster />
    </>
  );
}

export default App;
