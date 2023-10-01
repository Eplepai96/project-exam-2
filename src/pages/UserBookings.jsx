import React from "react";
import { UserBookings } from "../api/fetchUserBookings";

export function RenderUserBookings () {
    return (
        <body className="container">
            <UserBookings />
        </body>
    )
}