if (!import.meta.env.VITE_API_URL) {
  throw new Error("API base url not set");
}

export const ENV = {
  VITE_API_URL: import.meta.env.VITE_API_URL,
};
