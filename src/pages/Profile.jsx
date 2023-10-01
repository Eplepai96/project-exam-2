import React from "react";
import Profile from "../api/fetchProfile";

export function RenderProfile() {
  return (
    <body className="container">
      <Profile />
    </body>
  ) 
}