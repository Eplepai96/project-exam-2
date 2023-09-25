import React from "react";
import Profile from "../api/fetchProfile";

export function RenderProfile() {
  return (
    <div className="container">
      <Profile />;
    </div>
  ) 
}