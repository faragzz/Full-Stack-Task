"use client";
import React, { useEffect, useState } from "react";
import { PaginatedItems } from "@/app/components/home/paginatedItems";
import { getApartments } from "@/libs/apartmentService";
import { ApartmentApiResponse } from "@/libs/types/getApartments";

export default function Home() {
    const [apartments, setApartments] = useState<ApartmentApiResponse | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        async function fetchApartments() {
            const ans = await getApartments(currentPage, itemsPerPage);
            setApartments(ans);
        }
        fetchApartments();
    }, [currentPage]);

    // Handle page change from child component
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            {apartments && (
                <PaginatedItems
                    items={apartments.data}
                    itemsPerPage={itemsPerPage}
                    pageCount={apartments.last_page}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            )}
        </>
    );
}
