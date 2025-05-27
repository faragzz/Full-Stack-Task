"use client"
import {useEffect, useState} from "react";
import {getApartments, searchApartments} from "@/libs/apartmentService";
import {ApartmentApiResponse} from "@/libs/types/types";

type Filters = {
    unitName?: string;
    unitNumber?: string;
    project?: string;
};

export const useApartments = (filters: Filters, currentPage: number, itemsPerPage: number) => {
    const [apartments, setApartments] = useState<ApartmentApiResponse | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                let result: ApartmentApiResponse | null;
                if (filters.unitName || filters.unitNumber || filters.project) {
                    result = await searchApartments(
                        filters.unitName,
                        filters.unitNumber,
                        filters.project,
                        currentPage,
                        itemsPerPage
                    );
                } else {
                    result = await getApartments(currentPage, itemsPerPage);
                }
                setApartments(result);
            } catch (error) {
                console.error("Failed to fetch apartments:", error);
                setApartments(null);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [filters, currentPage, itemsPerPage]);

    return {apartments, loading};
};
