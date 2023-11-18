export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetcher<T>(url: string) {
  const token = localStorage.getItem("token");
  const res = await fetch(API_URL + url, {
    headers: {
      Authorization: token ? `Bearer ${JSON.parse(token)}` : ``,
    },
  });

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    // @ts-ignore
    error.info = await res.json();
    // @ts-ignore
    error.status = res.status;
    throw error;
  }

  return (await res.json()) as T;
}
