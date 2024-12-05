import { getFlashSale } from "@/services/FlashSale/getFlashSale";
import React from "react";
import FlashSaleCard from "./FlashSaleCard";
import { FlashSaleType } from "@/types";

const FlashSale = async () => {
  const flashSales = await getFlashSale();

  return (
    <div className="md:mx-12 my-12">
      <h2 className="italic text-4xl font-semibold mb-4">Flash Sale⚡</h2>
      {flashSales.data.length <= 0 ? (
        <p className="text-2xl text-center my-4">No data found</p>
      ) : (
        <div className=" mx-12 grid items-center justify-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
          {flashSales.data.map((flashSale: FlashSaleType) => (
            <FlashSaleCard {...flashSale} key={flashSale.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FlashSale;
