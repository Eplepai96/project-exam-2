import React from "react";
import Venues from "../api/fetchAllVenues";

export function RenderVenues () {
    return (
        <body className="container">
            <Venues />
        </body>
    )
}