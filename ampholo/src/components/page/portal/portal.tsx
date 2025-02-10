import { PortalAccessProcess } from "./portal-access"
import { PortalFeature } from "./portal-feature"
import { PortalHeroSection } from "./portal-hero"


export const Portal = () => {
    return (
        <div className="space-y-10">
            <PortalHeroSection />
            <PortalFeature />
            <PortalAccessProcess />
        </div>
    )
}