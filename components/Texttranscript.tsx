"use client";

import { useEffect, useRef, useState } from "react";
import { Mic } from "lucide-react";
import { Messages } from "@/types";
import ConversationControls from "./ConversationControls";

interface TranscriptProps {
  messages: Messages[];
  currentUserMessage?: string;
}

const Texttranscript = ({ messages, currentUserMessage }: TranscriptProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentUserMessage]);

  return (
    <div
      ref={scrollRef}
      className="transcript-messages overflow-y-auto pr-2 flex-1"
    >
      {messages.map((message, index) => (
        <div
          key={index}
          className={`transcript-message ${
            message.role === "user"
              ? "transcript-message-user"
              : "transcript-message-assistant"
          }`}
        >
          <div
            className={`transcript-bubble ${
              message.role === "user"
                ? "transcript-bubble-user"
                : "transcript-bubble-assistant"
            }`}
          >
            {message.content}
          </div>
        </div>
      ))}
      {/* Assistant Streaming Message */}
      {/* {currentMessage && (
        <div className="transcript-message transcript-message-assistant">
          <div className="transcript-bubble transcript-bubble-assistant">
            {currentMessage}
            <span className="transcript-cursor" />
          </div>
        </div>
      )} */}

      {/* User Streaming Message */}
      {currentUserMessage && (
        <div className="transcript-message transcript-message-user">
          <div className="transcript-bubble transcript-bubble-user">
            {currentUserMessage}
            <span className="transcript-cursor" />
          </div>
        </div>
      )}
      {/* <ConversationControls onChange={setUserQuestion} /> */}
    </div>
  );
};

export default Texttranscript;
