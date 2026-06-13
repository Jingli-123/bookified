"use client";
import IntroFeature from "./IntroFeature";
import { cn } from "@/lib/utils";
import { IntroFeatureProps } from "./types";

interface IntroFeaturesSectionProps {
  title: string;
  titleClassname?: string;
  features: IntroFeatureProps[];
  width?:number;
}

export default function IntroFeaturesSection({
  title,
  titleClassname,
  features,
  width
}: IntroFeaturesSectionProps) {
  return (
    <div className="flex flex-col items-center justify-center border w-full h-[20%] shadow-sm rounded-xl gap-2 p-4 my-4">
      <h1 className={cn("font-bold text-xl", titleClassname)}>{title}</h1>
      <div className="flex flex-wrap md:flex-nowrap items-center md:justify-between gap-2 w-full">
        {features.map((item) => {
          return (
            <div className="flex" key={item.title}>
              <IntroFeature
                bgcolor={item.bgcolor}
                color={item.color}
                Icon={item.Icon}
                title={item.title}
                description={item.description}
                width={width}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
