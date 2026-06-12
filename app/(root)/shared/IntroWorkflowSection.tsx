"use client";
import ThemeImage from "@/components/ui/ThemeImage";
import { FaFolderOpen } from "react-icons/fa";
import { Badge } from "@mui/material";
import { PiBrainLight } from "react-icons/pi";
import { BsStars } from "react-icons/bs";
import { MoveRight } from "lucide-react";

export default function IntroSecondSession() {
  return (
    <div className="flex flex-col items-center justify-center border w-[70%] h-[20%] shadow-sm rounded-xl gap-2 p-4 my-4">
      <h1 className="font-bold text-2xl mb-4">From documents to answers</h1>
      <div className="flex w-[60%] items-center justify-between">
        <div>
          <Badge badgeContent={1} color="primary">
            <div className="flex items-center justify-center border w-[80px] h-[80px] shadow-sm rounded-xl">
              <FaFolderOpen color="#519FE8" size={50} />
            </div>
          </Badge>
        </div>

        <div className="flex items-center">
          <div className="w-32 border-t-2 border-dashed border-blue-300"></div>
          <MoveRight className="text-blue-400" />
        </div>

        <div>
          <Badge badgeContent={2} color="primary">
            <div className="flex items-center justify-center border w-[80px] h-[80px] shadow-sm rounded-xl">
              <PiBrainLight color="#519FE8" size={50} />
            </div>
          </Badge>
        </div>

        <div className="flex items-center">
          <div className="w-32 border-t-2 border-dashed border-blue-300"></div>
          <MoveRight className="text-blue-400" />
        </div>

        <div>
          <Badge badgeContent={3} color="primary">
            <div className="flex items-center justify-center border w-[80px] h-[80px] shadow-sm rounded-xl">
              <BsStars color="#519FE8" size={50} />
            </div>
          </Badge>
        </div>
      </div>
      <div className="flex w-[65%] items-start justify-between ml-8">
        <div className="w-[15%]">
          <p className="font-medium text-lg">Upload</p>
          <p className="text-sm">
            Upload PDFs, word files, manuals and policies.
          </p>
        </div>
        <div className="w-[15%] ml-6">
          <p className="font-medium text-lg">Retrieve</p>
          <p className="text-sm">
            Advanced retrieval finds the most relevant context.
          </p>
        </div>
        <div className="w-[15%] ml-4">
          <p className="font-medium text-lg">Answer</p>
          <p className="text-sm">Receive grounded answers with citations.</p>
        </div>
      </div>
    </div>
  );
}
