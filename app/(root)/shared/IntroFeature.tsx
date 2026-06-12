"use client";
import { IntroFeatureProps } from "./types";
import { cn } from "@/lib/utils";

export default function IntroFeature({
  Icon,
  title,
  description,
  color,
  bgcolor,
  divcolor,
  width,
  iconClassname,
}: IntroFeatureProps) {
  console.log(bgcolor);
  console.log(`bg-${bgcolor}`);
  return (
    <div
      className={cn(
        `flex items-center justify-between h-[120px] border shadow-sm rounded-xl`,
        divcolor,
      )}
      style={{
        width,
      }}
    >
      <div className="flex items-start justify-center w-[40%] h-full py-6">
        <div
          className={cn(
            `flex items-center justify-center w-[40px] h-[40px] rounded-full mx-2`,
            iconClassname,
            bgcolor,
          )}
        >
          <Icon size={24} color={color} />
        </div>
      </div>
      <div className="flex flex-col items-start justify-between h-full py-6">
        <p className="font-medium text-sm">{title}</p>
        <p className="text-[12px]">{description}</p>
      </div>
    </div>
  );
}
