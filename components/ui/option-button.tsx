"use client";

import { FiMoreHorizontal } from "react-icons/fi";
import { Button } from "@mui/material";

interface Props {
  onClose?: () => void;
  onOpen?:()=>void;
}

export default function OptionButton({ onClose, onOpen }: Props) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="inline-flex items-center justify-center rounded-full p-1 transition hover:bg-gray-100 active:scale-95 cursor-pointer"
    >
      <FiMoreHorizontal />
    </button>
  );
}
