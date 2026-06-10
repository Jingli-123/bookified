import { useCallback, useState } from "react";
import { getErrorMessage } from "../lib/utils";
import { Messages } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { booksURL } from "@/apiURL/apiURLs";
import { toast } from "sonner";

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
      citation: [],
    },
  ]);
  const [citation, setCitation] = useState<string>("");

  const postUserMess = useCallback(
    async (content: string, clerkId: string, bookId: string) => {
      console.log(process.env.NEXT_PUBLIC_BASE_EMB_URL);
      const token = await getToken();
      setLoading(true);
      // if (!content || !clerkId || !bookId) {
      //   return;
      // }
      try {
        const url = process.env.NEXT_PUBLIC_BASE_EMB_URL;
        const api_url = `${url}/questions/embed`;
        const res = await fetch(api_url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
                citation: [],
              },
              {
                role: "assisstent",
                content: result.answer,
                citation: result.citation,
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

  const postUserMessforMultipleBooks = useCallback(
    async (content: string, clerkId: string, bookIds: string[]) => {
      console.log(process.env.NEXT_PUBLIC_BASE_EMB_URL);
      const token = await getToken();
      setLoading(true);
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
        const result = await res.json();
        console.log("data", result);
        if (result.message === "Success") {
          setSuccess(true);
          setGptMessage(result.answer);
          setMessageArr((prev) => {
            return [
              ...prev,
              {
                role: "assisstent",
                content: result.answer,
                citation: result.citation,
              },
            ];
          });
          const bookId = result.source_segments[0].bookId.$oid;
          getBookDetails(clerkId, bookId);
        }
      } catch (e) {
        return {
          error: e,
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
