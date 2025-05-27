"use client";

import React, { useEffect, useState } from "react";
import { PaginatedItems } from "@/app/components/home/paginatedItems";
import { getApartments, searchApartments } from "@/libs/apartmentService";
import { ApartmentApiResponse } from "@/libs/types/types";
import SearchBar from "@/app/components/home/selectors";

type Filters = {
    unitName?: string;
    unitNumber?: string;
    project?: string;
};

export default function Home() {
    const [apartments, setApartments] = useState<ApartmentApiResponse | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [filters, setFilters] = useState<Filters>({});

    useEffect(() => {
        async function fetchData() {
            if (
                filters.unitName ||
                filters.unitNumber ||
                filters.project
            ) {
                // Pass filters + pagination explicitly
                const result = await searchApartments(
                    filters.unitName,
                    filters.unitNumber,
                    filters.project,
                    currentPage,
                    itemsPerPage
                );
                setApartments(result);
            } else {
                const result = await getApartments(currentPage, itemsPerPage);
                setApartments(result);
            }
        }

        fetchData();
    }, [currentPage, filters]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSearch = (newFilters: Filters) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };

    const handleClearSearch = () => {
        setFilters({});
        setCurrentPage(1);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />
            {apartments && (
                <PaginatedItems
                    items={apartments.data}
                    itemsPerPage={itemsPerPage}
                    pageCount={apartments.last_page}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}
