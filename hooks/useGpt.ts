import { useCallback, useState, useRef } from "react";
import { getErrorMessage } from "../lib/utils";
import { Messages } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { booksURL } from "@/apiURL/apiURLs";
import { toast } from "sonner";

export default function useGpt() {
  const { getToken } = useAuth();

  const messStr: string = "Hi there, How can I help you?";
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [messageArr, setMessageArr] = useState<Messages[]>([
    {
      role: "assisstent",
      content: messStr,
      citation: [],
    },
  ]);
  const [citation, setCitation] = useState<string>("");
  const [gptMessage, setGptMessage] = useState<Messages | null>(null);
  const typewriterTimer = useRef<NodeJS.Timeout | null>(null);
  const fullTextBuffer = useRef(""); // Stores the absolute full text received so far
  const displayedTextLength = useRef(0);

  const postUserMess = useCallback(
    async (content: string, clerkId: string, bookId: string) => {
      console.log(process.env.NEXT_PUBLIC_BASE_EMB_URL);
      const token = await getToken();

      // 1. Reset everything before a new request
      setLoading(true);
      setSuccess(false);
      setGptMessage(null);
      fullTextBuffer.current = "";
      displayedTextLength.current = 0;
      if (typewriterTimer.current) clearInterval(typewriterTimer.current);
      setMessageArr((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "loading",
          citation: [],
        },
      ]);

      // 2. Start the smooth typewriter animation interval (e.g., renders 1 char every 40ms)
      typewriterTimer.current = setInterval(() => {
        if (displayedTextLength.current < fullTextBuffer.current.length) {
          displayedTextLength.current += 1;
          // Slice the text up to the current animated length

          setGptMessage({
            role: "assisstant",
            content: fullTextBuffer.current.slice(
              0,
              displayedTextLength.current,
            ),
            citation: [],
          });
        }
      }, 40); // 💡 Change this value to adjust speed! (Larger number = Slower typing)

      try {
        const url = process.env.NEXT_PUBLIC_BASE_EMB_URL;
        const api_url = `${url}/questions/embed`;

        const res = await fetch(api_url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content, clerkId, bookId }),
        });

        if (!res.ok || !res.body)
          throw new Error("Network response was not ok");

        const reader = res.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let buffer = "";
        let finalCitation = [];

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.trim()) continue;

            try {
              const parsed = JSON.parse(line);

              if (parsed.error) throw new Error(parsed.error);

              if (parsed.event === "text") {
                // 💡 Key Change: Just feed the text into the buffer, let the interval handle the UI
                fullTextBuffer.current += parsed.data;
              } else if (parsed.event === "done") {
                if (parsed.answer) {
                  fullTextBuffer.current = parsed.answer;
                }
                finalCitation = parsed.citation || [];
              }
            } catch (jsonErr) {
              console.error("Failed to parse line:", line, jsonErr);
            }
          }
        }

        // 3. Wait for the typewriter animation to fully catch up before closing up shop
        while (displayedTextLength.current < fullTextBuffer.current.length) {
          await new Promise((resolve) => setTimeout(resolve, 50));
        }

        // Clear the animation interval safely
        if (typewriterTimer.current) {
          clearInterval(typewriterTimer.current);
          typewriterTimer.current = null;
        }

        setLoading(false);
        setSuccess(true);

        setMessageArr((prev) => {
          const updated = [...prev];

          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            content: fullTextBuffer.current || "No answer could be found.",
            citation: finalCitation,
          };

          return updated;
        });

        return {
          success: true,
          data: { answer: fullTextBuffer.current, citation: finalCitation },
        };
      } catch (e: any) {
        if (typewriterTimer.current) clearInterval(typewriterTimer.current);
        console.error("Error: Failed to get the answer", e);
        setLoading(false);
        setGptMessage(null);

        return {
          success: false,
          error: getErrorMessage(e, "Something went wrong"),
        };
      }
    },
    [],
  );

  const postUserMessforMultipleBooks = useCallback(
    async (content: string, clerkId: string, bookIds: string[]) => {
      console.log(process.env.NEXT_PUBLIC_BASE_EMB_URL);
      const token = await getToken();

      // 1. Reset everything before a new request
      setLoading(true);
      setSuccess(false);
      setGptMessage(null);
      fullTextBuffer.current = "";
      displayedTextLength.current = 0;
      if (typewriterTimer.current) clearInterval(typewriterTimer.current);
      setMessageArr((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "loading",
          citation: [],
        },
      ]);

      // 2. Start the smooth typewriter animation interval (e.g., renders 1 char every 40ms)
      typewriterTimer.current = setInterval(() => {
        if (displayedTextLength.current < fullTextBuffer.current.length) {
          displayedTextLength.current += 1;
          // Slice the text up to the current animated length

          setGptMessage({
            role: "assisstant",
            content: fullTextBuffer.current.slice(
              0,
              displayedTextLength.current,
            ),
            citation: [],
          });
        }
      }, 40); // 💡 Change this value to adjust speed! (Larger number = Slower typing)
      try {
        const url = process.env.NEXT_PUBLIC_BASE_EMB_URL;
        const api_url = `${url}/questions/multiple-books/embed`;
        const res = await fetch(api_url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: content,
            clerkId: clerkId,
            bookIds: bookIds,
          }),
        });
        if (!res.ok || !res.body)
          throw new Error("Network response was not ok");

        const reader = res.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let buffer = "";
        let finalCitation = [];

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.trim()) continue;

            try {
              const parsed = JSON.parse(line);

              if (parsed.error) throw new Error(parsed.error);

              if (parsed.event === "text") {
                // 💡 Key Change: Just feed the text into the buffer, let the interval handle the UI
                fullTextBuffer.current += parsed.data;
              } else if (parsed.event === "done") {
                if (parsed.answer) {
                  fullTextBuffer.current = parsed.answer;
                }
                finalCitation = parsed.citation || [];
              }
            } catch (jsonErr) {
              console.error("Failed to parse line:", line, jsonErr);
            }
          }
        }

        // 3. Wait for the typewriter animation to fully catch up before closing up shop
        while (displayedTextLength.current < fullTextBuffer.current.length) {
          await new Promise((resolve) => setTimeout(resolve, 50));
        }

        // Clear the animation interval safely
        if (typewriterTimer.current) {
          clearInterval(typewriterTimer.current);
          typewriterTimer.current = null;
        }

        setLoading(false);
        setSuccess(true);

        setMessageArr((prev) => {
          const updated = [...prev];

          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            content: fullTextBuffer.current || "No answer could be found.",
            citation: finalCitation,
          };

          return updated;
        });

        return {
          success: true,
          data: { answer: fullTextBuffer.current, citation: finalCitation },
        };
      } catch (e) {
        if (typewriterTimer.current) clearInterval(typewriterTimer.current);
        console.error("Error: Failed to get the answer", e);
        setLoading(false);
        setGptMessage(null);

        return {
          success: false,
          error: getErrorMessage(e, "Something went wrong"),
        };
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const getBookDetails = useCallback(async (userId: string, bookId: string) => {
    if (!bookId || !userId) {
      return;
    }
    setLoading(true);
    try {
      const url = booksURL.getBookDetail;
      const response = await fetch(url(userId, bookId));
      const data = await response.json();
      if (data.success) {
        console.log("useGPT", data);
        setCitation(data.title.book);
      } else {
        setCitation("");
      }
    } catch (e) {
      setCitation("");
      toast.error(`Get book title failed ${e}`);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    postUserMess,
    postUserMessforMultipleBooks,
    gptMessage,
    messageArr,
    success,
    getBookDetails,
    citation,
    setMessageArr,
  };
}
