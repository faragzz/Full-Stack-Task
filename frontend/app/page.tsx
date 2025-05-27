"use client";

import React, {useState} from "react";
import {PaginatedItems} from "@/app/components/home/paginatedItems";
import SearchBar from "@/app/components/home/selectors";
import {useApartments} from "@/app/hooks/useApartments";

type Filters = {
    unitName?: string;
    unitNumber?: string;
    project?: string;
};

export default function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [filters, setFilters] = useState<Filters>({});

    const {apartments, loading} = useApartments(filters, currentPage, itemsPerPage);

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
            <SearchBar onSearch={handleSearch} onClear={handleClearSearch}/>
            {loading && <p>Loading...</p>}
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
