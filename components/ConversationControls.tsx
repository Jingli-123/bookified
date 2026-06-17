"use client";

import { TextField, Button, InputAdornment } from "@mui/material";
import { IConversationControlsProps } from "../types";
import { useState } from "react";

export default function ConversationControls({
  onChange,
  onClick,
}: IConversationControlsProps) {
  const [message, setMessage] = useState<string>("");
  const handleSend = () => {
    if (!message.trim()) return;

    onClick(message);
    onChange((prev) => {
      return [
        ...prev,
        {
          role: "user",
          content: message,
          citation: [],
        },
      ];
    });
    setMessage("");
  };
  return (
    <div className="w-full">
      <TextField
        label="Ask a question"
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
          }
        }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  onClick={() => {
                    onChange((prev) => {
                      return [
                        ...prev,
                        {
                          role: "user",
                          content: message,
                          citation: [],
                        },
                      ];
                    });
                    onClick(message);
                    setMessage("");
                  }}
                >
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
