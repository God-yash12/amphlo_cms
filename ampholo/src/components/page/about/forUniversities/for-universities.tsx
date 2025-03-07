import { UniAboutFeatures } from "./uni-feature"
import { HeroUniversity } from "./hero"
import { JourneyUniversity } from "./journey"
import { WhyChooseAmphloCard } from "./uni-why-amphlo"
import { JoinNow } from "./join-now"


const ForUniverisities = () => {
  return (
    <div className="space-y-10">
      <HeroUniversity />
      <WhyChooseAmphloCard />
      <JourneyUniversity />
      <JoinNow />
      <UniAboutFeatures />
    </div>
  )
}

export default ForUniverisities
