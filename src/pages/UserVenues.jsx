import React from "react";
import { UserVenues } from "../api/fetchUserVenues";
import '../scss/user-specific-venues.scss'

export function RenderUserVenues() {
    return(
        <div className="container">
            <UserVenues />
        </div>
    )
}