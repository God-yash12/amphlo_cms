import { features } from 'process';
import { PartnerBenefit } from 'src/about/for-partners/partner-benefits/entities/partner-benefit.entity';
import { PartnerFeature } from 'src/about/for-partners/partner-features/entities/partner-feature.entity';
import { PartnerHero } from 'src/about/for-partners/partner-hero/entities/partner-hero.entity';
import { AboutHero } from 'src/about/for-university/hero/entities/hero.entity';
import { FeatureCard } from 'src/features/feature-cards/entities/feature-card.entity';
import { FeatureHero } from 'src/features/hero/entities/hero.entity';
import { Overview } from 'src/features/overview/entities/overview.entity';
import { WhyamphloCard } from 'src/forms/for-university/whyamphlo-card/entities/whyamphlo-card.entity';
import { KeyFeatureCard } from 'src/forms/key-feature-card/entities/key-feature-card.entity';
import { Banner } from 'src/home/banner/entities/banner.entity';
import { Hero } from 'src/home/hero/entities/hero.entity';
import { HomeAbout } from 'src/home/home-about/entities/home-about.entity';
import { HomeTransform } from 'src/home/home-transform/entities/home-transform.entity';
import { Testimonial } from 'src/home/testimonials/entities/testimonial.entity';
import { WhyAmphlo } from 'src/home/why-amphlo/entities/why-amphlo.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('image')
export class FileUpload {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  filename: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  mimetype: string;

  @Column()
  url: string

  // RELATION with home-about section
  @OneToOne(() => HomeAbout, homeAbout => homeAbout.image, { onDelete: 'CASCADE' })
  homeAbout_image: HomeAbout;

  //  relation with Home hero section
  @OneToOne(() => Hero, hero => hero.image, {onDelete: 'CASCADE'})
  heroImage: Hero;

  // relation with why-amphlo section
  @OneToOne(() => WhyAmphlo, whyAmphlo => whyAmphlo.image, {onDelete: 'CASCADE'})
  whyAmphloImage: WhyAmphlo;

  // relation with home banner section
  @OneToOne(() => Banner, banner => banner.image, {onDelete: 'CASCADE'})
  bannerImage: Banner;    

  // relation with home transform section
  @OneToOne(() => HomeTransform, homeTransform => homeTransform.image, {onDelete: 'CASCADE'})
  transformImage: HomeTransform;

  // relation with home key feature card
  @OneToOne(() => KeyFeatureCard, keyfeatureCard => keyfeatureCard.image, {onDelete: 'CASCADE'})
  keyFeatureImage: KeyFeatureCard;


  // relation with the Feature page

  // Feature Hero section
  @OneToOne(() => FeatureHero, featureHeroimage => featureHeroimage.image, {onDelete: 'CASCADE'})
  featureHeroImage: FeatureHero

  // relation with Core feature cards 
  @OneToOne(() => FeatureCard, featuresCardImage => featuresCardImage.image, {onDelete: 'CASCADE'})
  featureCardImage: FeatureCard

  // relation with the overview
  @ManyToOne(() => Overview, overview => overview.images, { onDelete: 'CASCADE' })
  overviewImage: Overview;

  //relation with the Testimonials 
  @OneToOne(() =>Testimonial, testimonial => testimonial.image, {onDelete: 'CASCADE'})
  testimonialImage: Testimonial;

  // relation with the About for university hero
  @OneToOne(() => AboutHero, aboutHero => aboutHero.image, {onDelete: 'CASCADE'})
  uniHeroImage: AboutHero;

  // relation with about for university why amphlo card section 
  @OneToOne(() => WhyamphloCard, whyAmphloCard => whyAmphloCard.image, {onDelete: 'CASCADE'})
  uniWhyAmphloCard: WhyamphloCard;
  
  // relation with about for univer feature card section 
  @OneToOne(() => WhyamphloCard, featureCardImage => featureCardImage.image, {onDelete: 'CASCADE'})
  uniFeatureCardImage: WhyamphloCard;

  // relation with partner
  //relation with partner hero 
  @OneToOne(() => PartnerHero, partnerHero => partnerHero.image, {onDelete: 'CASCADE'})
  partnerHeroImage: PartnerHero;

  //relation with partner benefit card
  @OneToOne(() => PartnerBenefit, partnerBenefit => partnerBenefit.image, {onDelete: 'CASCADE'})
  partnerBenefitImage: PartnerBenefit;

  // relation with partner feature
  @OneToOne(()=> PartnerFeature, partnerFeature => partnerFeature.image, {onDelete: "CASCADE"})
  partnerFeatureImage: PartnerFeature;

}
