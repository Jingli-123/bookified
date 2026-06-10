export const API_BASE = "/api";

export const booksURL = {
  getBookDetail: (userId: string, bookId: string) =>
    `${API_BASE}/books/${bookId}`,
};
