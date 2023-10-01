import React from "react";
import { EditProfileForm } from '../api/updateProfile'

export function RenderEditProfile() {
    return(
        <body className="container">
            <EditProfileForm />
        </body>
    )
}