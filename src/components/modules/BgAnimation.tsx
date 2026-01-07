"use client";

const BgAnimation = () => {
  const numberOfColorBoxes = 400;

  return (
    <div className="bgAnimation" id="bgAnimation">
      <div className="backgroundAnim"></div>

      {Array.from({ length: numberOfColorBoxes }).map((_, index) => (
        <div key={index} className="colorBox" />
      ))}
    </div>
  );
};

export default BgAnimation;
