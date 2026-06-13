"use client";
import { IntroFeatureProps } from "./types";
import { cn } from "@/lib/utils";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div
      className={cn(
        `flex items-center justify-between h-[140px] border shadow-sm rounded-xl px-1`,
        divcolor,
      )}
      style={
        isMobile
          ? {
              width: width,
            }
          : {
              maxWidth: width,
            }
      }
    >
      <div className="flex items-start justify-center w-[40%] h-full py-6">
        <div
          className={cn(
            `flex items-center justify-center w-[40px] h-[40px] rounded-full mx-1`,
            iconClassname,
            bgcolor,
          )}
        >
          <Icon size={24} color={color} />
        </div>
      </div>
      <div className="flex flex-col items-start justify-between h-full py-6">
        <p className="font-medium text-[12px]">{title}</p>
        <p className="text-[10px]">{description}</p>
      </div>
    </div>
  );
}
