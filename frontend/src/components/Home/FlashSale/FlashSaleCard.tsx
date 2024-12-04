import { FlashSaleType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FlashSaleCard = (flashSale: FlashSaleType) => {
  return (
    <div className="rounded-md border">
      <Image
        src={flashSale.product.images[0]}
        alt={flashSale.product.name}
        width={200}
        height={300}
        className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px] "
      />
      <div className="p-4">
        <h1 className="inline-flex items-center text-lg font-semibold">
          {flashSale.product.name}{" "}
        </h1>

        <div className="mt-5 flex items-center justify-between space-x-2">
          <div className="flex gap-x-2 items-center">
            <span className="block text-sm font-semibold">Price : </span>
            <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
              {flashSale.product.price} TK
            </span>
          </div>
          <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
            Brand:
          </span>
        </div>
        <div className="mt-3 flex items-center space-x-2">
          <span className="block text-sm font-semibold">
            Available Quantity :{" "}
          </span>

          <span>{flashSale.product.inventory}</span>
        </div>
        <div className="flex items-center mb-2 gap-1 my-4">
          <p className="text-15px font-semibold">Rating: </p>

          {/* <Rating
            initialRating={product.rating}
            emptySymbol={<FaStar className="text-gray-300 " />}
            fullSymbol={<FaStar className="text-yellow-500" />}
            fractions={2}
            readonly
          /> */}
        </div>
        <Link href={`/products/${flashSale.product.id}`}>
          <button
            type="button"
            className="mt-4 w-full rounded-sm bg-blue-600 px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            See Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FlashSaleCard;
