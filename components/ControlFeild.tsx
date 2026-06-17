"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Texttranscript from "@/components/Texttranscript";
import { IBook, Messages } from "@/types";
import ConversationControls from "./ConversationControls";
import useGpt from "@/hooks/useGpt";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import Transcript from "./Transcript";
import useVapi from "@/hooks/useVapi";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className="min-h-[400px] flex flex-col"
    >
      <div className="transcript-container min-h-[400px] w-full p-1 mt-2">
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ControlFeild({ book }: { book: IBook }) {
  const { userId } = useAuth();
  const { messages, currentMessage, currentUserMessage } = useVapi(book);
  const {
    loading,
    postUserMess,
    messageArr,
    success,
    setMessageArr,
    gptMessage,
  } = useGpt();

  const [value, setValue] = React.useState(0);

  const [userQuestion, setUserQuestion] = useState<string>();
  // const [assistantMess, setAssistantMess] = useState<string>("");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!userId || !book) return;
    console.log("message gpt question", userQuestion);
    if (userQuestion !== "") {
      postUserMess(userQuestion as string, userId, book._id);
    }
    if (success) {
      setUserQuestion("");
    }
  }, [userQuestion]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="lab API tabs example"
          sx={{
            "& .MuiTab-root": {
              fontSize: "1.1rem",
              color: "#666",
              textTransform: "none",
            },
            "& .Mui-selected": {
              color: "#1976d2",
              fontWeight: 700,
            },
          }}
        >
          <Tab label="Voice Conversation" {...a11yProps(0)} />
          <Tab label="Text Conversation" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Transcript
          messages={messages}
          currentMessage={currentMessage}
          currentUserMessage={currentUserMessage}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className="flex flex-col min-h-[300px]">
          <Texttranscript
            messages={messageArr}
            realMessage={gptMessage?.content}
            loading={loading}
            role={gptMessage?.role}
            // currentUserMessage={userQuestion as string}
          />
          <ConversationControls
            onChange={setMessageArr}
            onClick={setUserQuestion}
          />
        </div>
      </CustomTabPanel>
    </Box>
  );
}
