export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export interface HeroContent {
  slides: HeroSlide[];
  autoSlideInterval: number;
}