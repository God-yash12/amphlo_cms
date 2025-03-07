import { JoinNowPartnerSection } from "./join-partner"
import { PartnerBenefitSection } from "./partner-benefit"
import { PartnerFeatureSection } from "./partner-feature"
import { PartnerGallery } from "./partner-gallery"
import { PartnersHeroSection } from "./partner-hero"


const ForPertners = () => {
  return (
    <div className="space-y-14">
      <PartnersHeroSection />
      <PartnerBenefitSection />
      <JoinNowPartnerSection />
      <PartnerFeatureSection />
      <PartnerGallery />
    </div>
  )
}

export default ForPertners
