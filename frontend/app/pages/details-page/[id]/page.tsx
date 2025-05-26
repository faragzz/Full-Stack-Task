"use client";
import React, { useEffect } from "react";

type Params = {
    id: string;
};

const DetailsPage = (props: { params: Params }) => {
    const { id } = props.params;

    useEffect(() => {
        console.log("id", id);
    }, [id]);

    return <div>details page for id: {id}</div>;
};

export default DetailsPage;
