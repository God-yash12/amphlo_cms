import { JoinNowPartnerSection } from "./join-partner"
import { PartnerBenefitSection } from "./partner-benefit"
import { PartnerFeatureSection } from "./partner-feature"
import { PartnerGallery } from "./partner-gallery"
import { PartnersHeroSection } from "./partner-hero"


const ForPertners = () => {
  return (
    <div>
      <PartnersHeroSection />
      <PartnerBenefitSection />
      <JoinNowPartnerSection />
      <PartnerFeatureSection />
      <PartnerGallery />
    </div>
  )
}

export default ForPertners
