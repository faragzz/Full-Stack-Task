"use client";

import React, {use} from "react";
import {Params} from "next/dist/server/request/params";
import {useApartmentDetails} from "@/app/hooks/useApartmentDetails";
import Link from "next/link";

const DetailsPage = (props: { params: Promise<Params> }) => {
    const params = use(props.params);
    const {id} = params;
    const {apartment, loading, error} = useApartmentDetails(Number(id));

    if (loading)
        return (
            <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
                Loading apartment details...
            </div>
        );

    if (error)
        return (
            <div className="flex justify-center items-center h-screen text-red-600 font-semibold text-lg">
                {error}
            </div>
        );

    if (!apartment) return null;

    return (
        <>
            <Link
                href="/"
                className="inline-block mt-4 ml-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
            >
                &larr; Back
            </Link>

            <div className="max-w-5xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-10 mb-20">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                    {apartment.unitName} <span className="text-indigo-600"># {apartment.unitNumber}</span>
                </h1>

                <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-8">
                    <p className="text-xl text-gray-700 font-medium">Project: <span
                        className="font-semibold text-gray-900">{apartment.project}</span></p>
                    <p className="mt-2 sm:mt-0 text-2xl font-bold text-green-600"><span
                        className="text-black">Price:</span> ${apartment.price}</p>
                </div>

                <p className="text-gray-700 mb-10 leading-relaxed text-lg">{apartment.description}</p>

                {apartment.images && apartment.images.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                        {apartment.images.map((imgUrl, idx) => (
                            <div
                                key={idx}
                                className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                            >
                                <img
                                    src={imgUrl}
                                    alt={`Apartment image ${idx + 1}`}
                                    className="w-full h-48 object-cover"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                )}

                {apartment.details && (
                    <section className="border-t pt-6">
                        <h2 className="text-3xl font-semibold mb-6 text-gray-900">Apartment Details</h2>

                        {apartment.details.amenities && (
                            <div className="mb-5">
                                <h3 className="text-xl font-semibold mb-1 text-indigo-600">Amenities</h3>
                                <p className="text-gray-800">{apartment.details.amenities}</p>
                            </div>
                        )}

                        {apartment.details.floorPlanUrl && (
                            <div className="mb-5">
                                <h3 className="text-xl font-semibold mb-1 text-indigo-600">Floor Plan</h3>
                                <a
                                    href={apartment.details.floorPlanUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block text-indigo-700 hover:text-indigo-900 font-medium underline"
                                >
                                    View floor plan
                                </a>
                            </div>
                        )}

                        <div className="mb-5">
                            <h3 className="text-xl font-semibold mb-1 text-indigo-600">Policies</h3>
                            <p className="text-gray-800">{apartment.details.policies}</p>
                        </div>

                        {apartment.details.additionalNotes && (
                            <div>
                                <h3 className="text-xl font-semibold mb-1 text-indigo-600">Additional Notes</h3>
                                <p className="text-gray-800">{apartment.details.additionalNotes}</p>
                            </div>
                        )}
                    </section>
                )}
            </div>
        </>
    );
};

export default DetailsPage;
