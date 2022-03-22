import React from "react";
import Lottie from "react-lottie-player";
import animationData from "../../animations/load.json";

export default function Loading() {
  return (
    <div className="cargando">
      <Lottie loop animationData={animationData} play  className="cargando--animaciones" />
    </div>
  );
}