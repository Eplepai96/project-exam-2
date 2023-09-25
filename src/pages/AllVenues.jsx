import React from "react";
import Venues from "../api/fetchAllVenues";

export function RenderVenues () {
    return (
        <div className="container">
            <Venues />
        </div>
    )
}