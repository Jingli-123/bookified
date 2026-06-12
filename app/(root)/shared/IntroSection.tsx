"use client";
import ThemeImage from "@/components/ui/ThemeImage";
import { BiBook } from "react-icons/bi";

export default function IntroFeaturesSession() {
  return (
    <div className="flex items-center justify-center border w-[70%] h-[20%] shadow-sm rounded-xl p-4">
      <div className="flex flex-col items-start justify-center w-[40%] gap-2">
        <h1 className="text-2xl">
          Knowledge shouldn't disappear inside documents.
        </h1>
        <div className="flex gap-2">
          <BiBook width={32} height={32} /> <p className="text-sm">PDFs.</p>
        </div>
        <div className="flex gap-2">
          <BiBook width={32} height={32} /> <p className="text-sm">Policies.</p>
        </div>
        <div className="flex gap-2">
          <BiBook width={32} height={32} />{" "}
          <p className="text-sm">Contracts.</p>
        </div>
        <div className="flex gap-2">
          <BiBook width={32} height={32} /> <p className="text-sm">Manuals.</p>
        </div>
        <div className="flex gap-2">
          <BiBook width={32} height={32} /> <p className="text-sm">Books.</p>
        </div>
        <p className="font-bold text-xl text-blue-500">
          Your Knowledge exists.
        </p>
        <p className="font-bold text-xl text-blue-500">
          But nobody can find it.
        </p>
        <p className="text-sm">
          Mnemonic Threads turns information into memory.
        </p>
      </div>
      <div>
        <ThemeImage
          dark="/assets/process-dark.svg"
          light="/assets/process.svg"
          alt="process"
          width={600}
          height={600}
        />
      </div>
    </div>
  );
}
