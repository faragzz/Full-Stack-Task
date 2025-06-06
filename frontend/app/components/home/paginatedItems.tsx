"use client";
import React from "react";
import ReactPaginate from "react-paginate";
import {Items} from "@/app/components/home/Items";
import {Apartment} from "@/libs/types/types";

type PaginatedItemsProps = {
    items: Apartment[];
    itemsPerPage: number;
    pageCount: number;
    currentPage: number;
    onPageChange: (page: number) => void;
};

export const PaginatedItems = ({
                                   items,
                                   pageCount,
                                   currentPage,
                                   onPageChange,
                               }: PaginatedItemsProps) => {
    const handlePageClick = (event: { selected: number }) => {
        onPageChange(event.selected + 1);
    };

    return (
        <div className="flex flex-col w-full h-[700px] justify-between">
            <Items currentApartment={items}/>
            <div className="flex justify-center py-4">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next >"
                    previousLabel="< Prev"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    forcePage={currentPage - 1}
                    renderOnZeroPageCount={null}
                    containerClassName="flex gap-2"
                    pageClassName="px-3 py-1 border border-gray-300 rounded cursor-pointer"
                    activeClassName="bg-blue-500 text-white"
                    previousClassName="px-3 py-1 border border-gray-300 rounded cursor-pointer"
                    nextClassName="px-3 py-1 border border-gray-300 rounded cursor-pointer"
                    breakClassName="px-3 py-1"
                />
            </div>
        </div>
    );
};
