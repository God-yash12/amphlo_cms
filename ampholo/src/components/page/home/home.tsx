
import { Banner } from "./banner"
import Counters from "./counters"
import Hero from "./hero"
import HomeAbout from "./home-about"
import KeyFeature from "./key-feature"
import { Testimonials } from "./testimonial"
import { Transform } from "./transform"
import WhyAmphlo from "./why-amphlo"

const Home = () => {
  return (
    <div className="space-y-12">
      <Hero />
      <Banner />
      <HomeAbout />
      <KeyFeature />
      <Transform />
      <WhyAmphlo />
      <Counters />
      <Testimonials />
    </div>
  )
}

export default Home
