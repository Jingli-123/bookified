"use client";
import { Button } from "@mui/material";
import { FiStar } from "react-icons/fi";
import ThemeImage from "@/components/ui/ThemeImage";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function IntroHeroSession() {
  
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  return (
    <>
      <div className="w-full flex items-center justify-center px-10">
        <div className="flex flex-col gap-6 md:w-[40%] w-full">
          <p className="text-sm text-blue-500">AI-POWERED KNOWLEDGE PLATFORM</p>
          <h1 className="font-bold text-4xl text-black dark:text-white">
            Answers grounded in your organization's memory
          </h1>
          <p>
            Transform documents into trusted answers with citations, context,
            and enterprise-grade retrieval.
          </p>
          <div className="flex gap-2">
            <Button variant="contained">Start Free Trial</Button>
            <Button variant="outlined">Book Demo</Button>
          </div>
          <div className="flex items-center justify-start gap-1">
            <FiStar color="blue" width={10} height={10} />
            <FiStar color="blue" width={10} height={10} />
            <FiStar color="blue" width={10} height={10} />
            <FiStar color="blue" width={10} height={10} />
            <FiStar color="blue" width={10} height={10} />
            <p>Truested by teams handling critical knowledge.</p>
          </div>
        </div>
        {!isMobile &&<div>
          <ThemeImage
            dark="/assets/homepage-dark.svg"
            light="/assets/homepage-light.svg"
            alt="Homepage"
            width={400}
            height={400}
          />
        </div>}
      </div>
    </>
  );
}
