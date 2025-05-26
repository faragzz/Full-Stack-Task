"use client";
import Image from "next/image";
import {Apartment} from "@/libs/types/types";
import normalizeImageSrc from "@/utils/imageValidation";
import {useRouter} from 'next/navigation'

export const Items = ({currentApartment}: { currentApartment: Apartment[] }) => {
    const router = useRouter();
    return (
        <div className="flex flex-col gap-6 p-4 bg-gray-50">
            {currentApartment.map((apartment) => {
                const imageSrc = apartment.images && apartment.images.length > 0
                    ? normalizeImageSrc(apartment.images[0])
                    : null;

                return (
                    <div onClick={() => router.push(`/pages/details-page/${apartment.id}`)}
                         key={apartment.id}
                         className="bg-white rounded-lg shadow-md border border-gray-200 flex flex-col md:flex-row overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                    >
                        {/* Image preview */}
                        {imageSrc ? (
                            <div className="relative w-full h-48 md:w-56 md:h-auto flex-shrink-0">
                                <Image
                                    src={imageSrc}
                                    alt={`${apartment.unitName} image`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 224px"
                                    priority={true}
                                />
                            </div>
                        ) : (
                            <div
                                className="w-full h-48 md:w-56 md:h-auto bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                                No Image
                            </div>
                        )}

                        <div className="p-5 flex flex-col justify-between flex-grow">
                            <div>
                                <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                                    {apartment.unitName} - {apartment.unitNumber}
                                </h3>
                                <p className="text-indigo-600 font-medium mt-1">{apartment.project}</p>
                                <p className="text-gray-700 mt-3 line-clamp-3 md:line-clamp-4">
                                    {apartment.description}
                                </p>
                            </div>
                            <div className="mt-5 text-lg md:text-xl font-bold text-green-600">
                                ${parseFloat(apartment.price).toLocaleString()}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
