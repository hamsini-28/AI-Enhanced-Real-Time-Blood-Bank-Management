import 'remixicon/fonts/remixicon.css'
import './App.css'
import Signin from './pages/Signin';
import SignUp from './pages/SignUp';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import BloodCompatibility from './pages/BloodCompatibility';
import Eligibility from './components/Eligibility';
import DonationCenters from './pages/DonationCenters';
import Stories from './components/Stories';
import Faq from './components/Faq';
import Footer from './components/Footer';
import StoryPage from './pages/StoryPage';
import EventPage from './pages/EventPage';
import { Outlet, Route, Routes } from 'react-router-dom';
import RegisterForEvents from './pages/RegisterForEvents';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AboutPage from './pages/About';
import RegisterForCenter from './pages/RegisterForCenter';

// ✅ ORG pages
import OrgLogin from "./pages/OrgLogin";
import OrgDashboard from "./pages/OrgDashboard";
import OrgSignUp from "./pages/OrgSignUp";  
import OrgManageEvents from "./pages/OrgManageEvents";
import OrgManageStock from "./pages/OrgManageStock";
import UpcomingDrives from "./pages/UpcomingDrives";

function App() {
  return (
    <div>
      <ScrollToHash />
      <Routes>

        {/* ✅ Org routes without navbar */}
        <Route path="/org/login" element={<OrgLogin />} />
        <Route path="/org/signup" element={<OrgSignUp />} />
        <Route path="/org/dashboard" element={<OrgDashboard />} />
        <Route path="/org/manage-events" element={<OrgManageEvents />} />
        <Route path="/org/manage-stock" element={<OrgManageStock />} />
        <Route path="/org/upcoming-drives" element={<UpcomingDrives />} />

        {/* ✅ USER UI WITH NAVBAR */}
        <Route path='/' element={<Layout/>}>
          <Route path="/" element={<UserInterface/>} />
          <Route path='/signin' element={<Signin/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/stories' element={<StoryPage/>} />
          <Route path='/event/:eventId' element={<RegisterForEvents/>} />
          <Route path='/org/:orgId' element={<RegisterForCenter/>} />
          <Route path='/about' element={<AboutPage/>} />
        </Route>

      </Routes>
    </div>
  )
}

function Layout(){
  return (
    <>
      <NavBar/>
      <Outlet/>
    </>
  )
}

function UserInterface() {
  return(
    <div>
      <Home />
      <About />
      <BloodCompatibility />
      <Eligibility />
      <DonationCenters />
      <EventPage />
      <Stories />
      <Faq />
      <Footer />
    </div>
  )
}

function ScrollToHash() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  return null;
}

export default App;
