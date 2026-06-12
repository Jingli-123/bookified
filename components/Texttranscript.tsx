"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import { Messages } from "@/types";
import CloseButton from "./ui/close-button";

interface TranscriptProps {
  messages: Messages[];
  currentUserMessage?: string;
  loading: boolean;
  bookIds?:string[];
}

const Texttranscript = ({
  messages,
  currentUserMessage,
  loading,
}: TranscriptProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [openSource, setOpenSource] = useState<number | null>(null);

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
            {message.role !== "user" &&
              message.citation.map((i) => {
                return (
                  <div className="flex gap-2" key={i.source}>
                    <Button
                      variant="text"
                      onClick={() => setOpenSource(i.source)}
                    >
                      [{i.source}] {i.content.slice(0, 30)}...
                    </Button>
                    {openSource === i.source && (
                      <div className="fixed w-full h-full inset-0 z-50 flex items-center justify-center bg-black/30">
                        <div className="bg-white w-[80%] max-h-[500px] overflow-y-auto text-sm rounded-xl">
                          <div className="w-full flex justify-end py-2">
                            <CloseButton onClose={() => setOpenSource(null)} />
                          </div>
                          <p className="p-4">Source {i.source}</p>
                          <p className="p-4">{i.content}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
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
