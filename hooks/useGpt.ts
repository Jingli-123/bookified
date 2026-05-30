import { useCallback, useState } from "react";
import { getErrorMessage } from "../lib/utils";
import { Messages } from "@/types";
import { useAuth } from "@clerk/nextjs";

export default function useGpt() {
  const { getToken } = useAuth();

  const messStr: string = "Hi there, How can I help you?";
  const [loading, setLoading] = useState<boolean>(false);
  const [gptMessage, setGptMessage] = useState<string>(messStr);
  const [success, setSuccess] = useState<boolean>(false);
  const [messageArr, setMessageArr] = useState<Messages[]>([
    {
      role: "assisstent",
      content: messStr,
    },
  ]);

  const postUserMess = useCallback(
    async (content: string, clerkId: string, bookId: string) => {
      const token = await getToken();
      setLoading(true);
      if (!content || !clerkId || !bookId) {
        return;
      }
      try {
        const url = process.env.NEXT_PUBLIC_BASE_EMB_URL;
        const api_url = `${url}/questions/embed`;
        const res = await fetch(api_url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: content,
            clerkId: clerkId,
            bookId: bookId,
          }),
        });
        const result = await res.json();
        console.log("data", result);
        if (result.message === "Success") {
          setSuccess(true);
          setGptMessage(result.answer);
          setMessageArr((prev) => {
            return [
              ...prev,
              {
                role: "user",
                content: content,
              },
              {
                role: "assisstent",
                content: result.answer,
              },
            ];
          });
        } else {
          setGptMessage("Fetch failed, please refresh the page.");
        }
        setLoading(false);
        return {
          success: true,
          data: result,
        };
      } catch (e) {
        console.error("Error creating a book");

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

  return {
    loading,
    postUserMess,
    gptMessage,
    messageArr,
    success,
  };
}
