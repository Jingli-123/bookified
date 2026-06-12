"use client";

import Link from "next/link";
import IntroHeroSection from "./IntroHeroSection";
import IntroSection from "./IntroSection";
import IntroSecondSection from "./IntroWorkflowSection";
import IntroFeaturesSection from "./IntroFeaturesSection";
import {
  buildFeatures,
  designedFeatures,
  featuresTitle,
} from "@/lib/constants";
import ThemeButton from "@/components/ui/ThemeButton";
import { Button } from "@mui/material";

export default function HomePage() {
  const features = [
    { feature: buildFeatures, title: featuresTitle[0], width: 180 },
    { feature: designedFeatures, title: featuresTitle[1], width: 270 },
  ];
  return (
    <div className="flex flex-col items-center justify-center mt-[100px] px-4">
      <IntroHeroSection />
      <IntroSection />
      <IntroSecondSection />
      {features.map((item) => {
        return (
          <div key={item.title} className="w-[70%]">
            <IntroFeaturesSection
              features={item.feature}
              title={item.title}
              width={item.width}
            />
          </div>
        );
      })}
      <div className="flex items-center justify-center bg-[url(/assets/homepage-footer.svg)] dark:bg-[url(/assets/homepage-footer-dark.svg)] bg-cover bg-center  h-[300px] w-full">
        <div>
          <h1>Turn documents into memory.</h1>
          <p>Start building a more intelligent organization.</p>
          <Link href="/bookfield" target="_blank">
            <Button
              variant="contained"
              sx={{
                fontSize: "12px",
              }}
            >
              Start Free Trial
            </Button>
          </Link>
          <Link href="/bookfield" target="_blank">
            <ThemeButton>Book Demo</ThemeButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
