import React from "react";

export const renderImage = image =>
  typeof image === "string" ? (
    <img data-testid="no-data-image" src={image} />
  ) : (
    image
  );
