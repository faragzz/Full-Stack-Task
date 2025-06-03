"use client"

import React, {useState} from 'react';

type SearchFilters = {
    unitName?: string;
    unitNumber?: string;
    project?: string;
};

type SearchBarProps = {
    onSearch: (filters: SearchFilters) => void;
    onClear: () => void;
    initialFilters?: SearchFilters;
};
const SearchBar = ({
                       onSearch,
                       onClear,
                       initialFilters = {},
                   }: SearchBarProps) => {
    const [filters, setFilters] = useState<SearchFilters>(initialFilters || {});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(filters);
    };

    const handleClear = () => {
        setFilters({});
        onClear();
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    name="unitName"
                    value={filters.unitName || ""}
                    onChange={handleInputChange}
                    placeholder="Unit Name"
                    className="flex-1 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                    type="text"
                    name="unitNumber"
                    value={filters.unitNumber || ""}
                    onChange={handleInputChange}
                    placeholder="Unit Number"
                    className="flex-1 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                    type="text"
                    name="project"
                    value={filters.project || ""}
                    onChange={handleInputChange}
                    placeholder="Project"
                    className="flex-1 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div className="flex items-center gap-4">
                <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition"
                >
                    Search
                </button>
                <button
                    type="button"
                    onClick={handleClear}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
                >
                    Clear
                </button>
            </div>
        </form>
    );
};

export default SearchBar;
