import axios from '@/utils/axios';
import {ApartmentApiResponse, Apartment} from "@/libs/types/types";

export const getApartments = async (page = 1, limit = 10): Promise<ApartmentApiResponse | null> => {
    try {
        const response = await axios.get(`/apartments?page=${page}&limit=${limit}`);
        console.log(response.data)
        return response.data;
    } catch (error: any) {
        console.error('API error:', error.message);
        console.error('Config:', error.config);
        return null
    }
};


export const getApartmentById = async (id: number): Promise<Apartment | null> => {
    try {
        const response = await axios.get(`/apartments/id/${id}`);
        console.log(response.data)
        return response.data.data;
    } catch (error: any) {
        console.error('API error:', error.message);
        console.error('Config:', error.config);
        return null
    }
};


export const searchApartments = async (
    unitName?: string,
    unitNumber?: string,
    project?: string,
    page = 1,
    limit = 10
) => {
    try {
        const params = new URLSearchParams();

        params.append("page", page.toString());
        params.append("limit", limit.toString());

        if (unitName) params.append("unitName", unitName);
        if (unitNumber) params.append("unitNumber", unitNumber);
        if (project) params.append("project", project);

        const response = await axios.get(`/apartments/search?${params.toString()}`);

        console.log("Search: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error searching apartments:", error);
        return {
            status: "error",
            data: [],
            total: 0,
            page,
            last_page: 0,
            message: "Failed to fetch apartments",
        };
    }
};
