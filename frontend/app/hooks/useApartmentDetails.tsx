"use client"
import {useEffect, useState} from "react";
import {getApartmentById} from "@/libs/apartmentService";
import {Apartment} from "@/libs/types/types";

export const useApartmentDetails = (id: number) => {
    const [apartment, setApartment] = useState<Apartment | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchApartment() {
            setLoading(true);
            setError(null);
            try {
                const data = await getApartmentById(id);
                if (data) {
                    setApartment(data);
                } else {
                    setError("Apartment not found or failed to load.");
                }
            } catch (err) {
                console.error("Error fetching apartment:", err);
                setError("Something went wrong.");
            } finally {
                setLoading(false);
            }
        }

        fetchApartment();
    }, [id]);

    return {apartment, loading, error};
};
