import React from "react";
import { UserVenues } from "../api/fetchUserVenues";

export function RenderUserVenues() {
    return(
        <body className="container">
            <UserVenues />
        </body>
    )
}