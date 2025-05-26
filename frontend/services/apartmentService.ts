import axios from '@/utils/axios';

export const getApartments = async (page = 1, limit = 10) => {
    const response = await axios.get(`/apartments?page=${page}&limit=${limit}`);
    return response.data;
};

export const getApartmentById = async (id: number) => {
    const response = await axios.get(`/apartments/id/${id}`);
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
