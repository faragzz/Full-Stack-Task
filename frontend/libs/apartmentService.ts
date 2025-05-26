import axios from '@/utils/axios';
import {ApartmentApiResponse} from "@/libs/types/getApartments";

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


export const getApartmentById = async (id: number) => {
    const response = await axios.get(`/apartments/id/${id}`);
    console.log(response)
    return response.data;
};

export const createApartment = async (data: any) => {
    const response = await axios.post('/apartments/create', data);
    return response.data;
};

export const searchApartments = async (filters: {
    unitName?: string;
    unitNumber?: string;
    project?: string;
}) => {
    const params = new URLSearchParams(filters as any).toString();
    const response = await axios.get(`/apartments/search?${params}`);
    return response.data;
};
