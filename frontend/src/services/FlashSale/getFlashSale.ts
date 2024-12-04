"use server";

export const getFlashSale = async () => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/flashSale`);
  const data = await fetch(url, {
    cache: "no-store",
  });

  const result = await data.json();
  return result;
};
