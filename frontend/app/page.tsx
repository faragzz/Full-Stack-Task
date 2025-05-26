"use client"
import React, {useEffect, useState} from "react";
import {PaginatedItems} from "@/app/components/home/paginatedItems";
import {getApartments} from "@/libs/apartmentService";
import {ApartmentApiResponse} from "@/libs/types/getApartments";

export default function Home() {
    const [apartments, setApartments] = useState<ApartmentApiResponse | null>()
    useEffect(() => {
        async function fetchApartments() {
            const ans = await getApartments();
            setApartments(ans);
        }

        fetchApartments();
    }, []);

    return (
        <>
            {apartments && (
                <PaginatedItems items={apartments.data} itemsPerPage={5}/>
            )}
        </>
    );

}
