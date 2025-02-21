
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/layout";
import Home from "./components/page/home/home";
import About from "./components/page/about/about";
import ForUniverisities from "./components/page/about/forUniversities/for-universities";
import ForPertners from "./components/page/about/forPartners/for-partners";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import Hero from "./components/page/home/hero";
// import KeyFeatures from "./components/page/home/key-feature";
// import { Banner } from "./components/page/home/banner";
// import WhyAmphlo from "./components/page/home/why-amphlo";
// import Counters from "./components/page/home/counters";
// import { Transform } from "./components/page/home/transform";
// import HomeAbout from "./components/page/home/home-about";
// import { Testimonials } from "./components/page/home/testimonial";
import { HomeKeyFeatureCard } from "./components/forms/home/key-feature";
import FeatureHero from "./components/page/features/hero";
import { CoreFeature } from "./components/page/features/core-feature";
import { Agent } from "./components/page/features/agent";
import { FeatureOverview } from "./components/page/features/overview";
import { FeatureFAQs } from "./components/page/features/faqs";
import { CoreFeatureCard } from "./components/forms/feature/core-feature-card";
import { UniAboutFeatureCard } from "./components/forms/about/for-university/uni-feature-card";
import { UniAboutWhyAmphloCard } from "./components/forms/about/for-university/uni-why-amphlo-card";
import { CountryHero } from "./components/page/countries/country-hero/country-hero";
import { OurJourney } from "./components/page/about/our-journey/our-journey";
import { Portal } from "./components/page/portal/portal";
import Features from "./components/page/features/feature";
// import CountryList from "./components/page/countries/countries";
import { LoginForm } from "./components/login/login";
import PersistLogin from "./auth/presist_login";
import { RequireAuth } from "./auth/require_auth";
import { Adminsignup } from "./components/admin-signup/admin-signup";
import { ResetPassword } from "./components/login/reset-password/reset-password";
import { VerifyOTP } from "./components/login/reset-password/verify-otp";
import { NewPasswordForm } from "./components/login/reset-password/reset-password-form";


function App() {

  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />

          {/* password reset  */}
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="verify-otp" element={<VerifyOTP />} />
          <Route path="create-newPassword" element={<NewPasswordForm />} />

          <Route element={<PersistLogin />} >
            <Route element={<RequireAuth />} >
              <Route element={<AdminLayout />}>
                {/* home route  */}
                <Route index element={<Home />} />
                {/* <Route index element={<Home />}>
                  <Route path="hero" element={<Hero />} />
                  <Route path="key-features" element={<KeyFeatures />} />
                  <Route path="banner" element={<Banner />} />
                  <Route path="why-amphlo" element={<WhyAmphlo />} />
                  <Route path="counters" element={<Counters />} />
                  <Route path="home-about" element={<HomeAbout />} />
                  <Route path="transform" element={<Transform />} />
                  <Route path="testimonials" element={<Testimonials />} /> */}
                {/* </Route> */}
                {/* About route  */}
                <Route path="about" element={<About />}>
                  <Route path="for-universities" element={<ForUniverisities />} />
                  <Route path="for-partners" element={<ForPertners />} />
                  <Route path="our-journey" element={<OurJourney />} />
                </Route>
                {/* Feature Route */}
                <Route path="features" element={<Features />} >
                  <Route path="hero" element={<FeatureHero />} />
                  <Route path="core-features" element={<CoreFeature />} />
                  <Route path="agent" element={<Agent />} />
                  <Route path="overview" element={<FeatureOverview />} />
                  <Route path="faqs" element={<FeatureFAQs />} />
                </Route>
                {/* Country Route */}
                <Route path="destination">
                  <Route path=":countryName" element={<CountryHero />} />
                </Route>

                {/* form route */}
                <Route path="contents">
                  <Route path="key-feature" element={<HomeKeyFeatureCard />} />
                  <Route path="core-feature" element={<CoreFeatureCard />} />
                  <Route path="uni-why-amphlo-card" element={<UniAboutWhyAmphloCard />} />
                  <Route path="about-feature-card" element={<UniAboutFeatureCard />} />
                </Route>
                {/* About Portal Route */}
                <Route path="portal" element={<Portal />} />
                <Route path="/add-admin" element={<Adminsignup />} />
              </Route>
            </Route >
          </Route>
        </Routes >

      </Router >
    </>
  )
}

export default App
