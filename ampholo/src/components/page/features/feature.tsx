import { Agent } from "./agent"
import { CoreFeature } from "./core-feature"
import Hero from "./hero"
import { FeatureOverview } from "./overview"
import { FeatureFAQs } from "./faqs"




const Features = () => {
  return (
    <div>
      <Hero />
      <Agent />
      <CoreFeature/>
      <FeatureOverview/>
      <FeatureFAQs />
    </div>
  )
}

export default Features
