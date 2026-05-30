"use client";

import { TextField, Button, InputAdornment } from "@mui/material";
import { IConversationControlsProps } from "../types";
import { useState } from "react";

export default function ConversationControls({
  onChange,
}: IConversationControlsProps) {
  const [message, setMessage] = useState<string>("");
  const handleSend = () => {
    if (!message.trim()) return;

    onChange(message);
    setMessage("");
  };
  return (
    <div className="w-full">
      <TextField
        label="Ask a question"
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        // onKeyDown={(e) => {
        //   if (e.key === "Enter") {
        //     e.preventDefault();
        //     handleSend();
        //   }
        // }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <Button variant="contained" onClick={() => onChange(message)}>
                  Send
                </Button>
              </InputAdornment>
            ),
          },
        }}
      />
    </div>
  );
}
