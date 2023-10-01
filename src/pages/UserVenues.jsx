import React from "react";
import { UserVenues } from "../api/fetchUserVenues";
import '../scss/user-specific-venues.scss'

export function RenderUserVenues() {
    return(
        <body className="container">
            <UserVenues />
        </body>
    )
}