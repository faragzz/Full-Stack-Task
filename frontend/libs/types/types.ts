export type ApartmentDetails = {
    id: number;
    amenities: string | null;
    floorPlanUrl: string | null;
    policies: string;
    additionalNotes: string;
};

export type Apartment = {
    id: number;
    unitName: string;
    unitNumber: string;
    project: string;
    description: string;
    price: string;
    images: string[] | null;
    details?: ApartmentDetails | null;
};

export type ApartmentApiResponse = {
    status: string;
    data: Apartment[];
    total: number;
    page: number;
    last_page: number;
};
