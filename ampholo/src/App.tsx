
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/layout";
import Home from "./components/page/home/home";
import About from "./components/page/about/about";
import Features from "./components/page/features/feature";
import Countries from "./components/page/countries/countries";
import KeyFeatures from "./components/page/home/key-feature";
import Banner from "./components/page/home/banner";
import WhyAmphlo from "./components/page/home/why-amphlo";
import Counters from "./components/page/home/counters";
import Transform from "./components/page/home/transform";
import ForUniverisities from "./components/page/about/forUniversities/for-universities";
import ForPertners from "./components/page/about/forPartners/for-partners";
import Hero from "./components/page/home/hero";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import HomeAbout from "./components/page/home/home-about";
import KeyFeaturesForm from "./components/forms/home/key-feature";
import WhyAmphloForm from "./components/forms/home/why-amphlo";



function App() {

  return (
    <>
    <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            {/* home route  */}
            <Route path="home" element={<Home />}>
              <Route path="hero" element={<Hero />} />
              <Route path="key-features" element={<KeyFeatures />} />
              <Route path="banner" element={<Banner />} />
              <Route path="why-amphlo" element={<WhyAmphlo />} />
              <Route path="counters" element={<Counters />} />
              <Route path="home-about" element={<HomeAbout />} />
              <Route path="transform" element={<Transform />} />
            </Route>
            {/* About route  */}
            <Route path="about" element={<About />}> 
            <Route path="for-universities" element={<ForUniverisities />} />
            <Route path="for-partners" element={<ForPertners />} />
            </Route>
            {/* Feature Route */}
            <Route path="features" element={<Features />} />
            {/* Country Route */}
            <Route path="countries" element={<Countries />} />
            
            {/* form route */}
            <Route path="form">
              <Route path="key-feature" element={<KeyFeaturesForm />} />
              <Route path="why-amphlo" element={<WhyAmphloForm />} />
            </Route>
          </Route>
        </Routes>

      </Router>
    </>
  )
}

export default App
