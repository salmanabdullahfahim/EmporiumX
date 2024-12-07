"use server";

export const getFlashSale = async () => {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/flashSale`);
    const data = await fetch(url, {
      cache: "no-store",
    });

    if (!data.ok) {
      throw new Error(`HTTP error! status: ${data.status}`);
    }

    const result = await data.json();
    return result;
  } catch (error) {
    console.error("Failed to fetch flash sale:", error);
    throw error; // Re-throw the error to handle it in the component
  }
};
