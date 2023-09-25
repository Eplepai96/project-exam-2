import React from "react";
import { UserBookings } from "../api/fetchUserBookings";

export function RenderUserBookings () {
    return (
        <div className="container">
            <UserBookings />
        </div>
    )
}