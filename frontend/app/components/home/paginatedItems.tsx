"use client"
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Items } from "@/app/components/home/Items";
import { Apartment } from "@/libs/types/getApartments";

type PaginatedItemsProps = {
    items: Apartment[];
    itemsPerPage: number;
};

export const PaginatedItems = ({ items, itemsPerPage }: PaginatedItemsProps) => {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event: { selected: number }) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };

    return (
        <div className="flex flex-col w-full h-[700px] bg-red-50 justify-between">
            <Items currentApartment={currentItems} />
            <div className="flex justify-center py-4">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next >"
                    previousLabel="< Prev"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    renderOnZeroPageCount={null}
                    containerClassName="flex gap-2"
                    pageClassName="px-3 py-1 border border-gray-300 rounded"
                    activeClassName="bg-blue-500 text-white"
                    previousClassName="px-3 py-1 border border-gray-300 rounded"
                    nextClassName="px-3 py-1 border border-gray-300 rounded"
                    breakClassName="px-3 py-1"
                />
            </div>
        </div>
    );
};
