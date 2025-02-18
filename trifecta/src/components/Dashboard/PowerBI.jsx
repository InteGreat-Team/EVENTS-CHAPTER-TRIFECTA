import React from "react";

const PowerBI = ({ embedUrl }) => {
  return (
    <div className="w-full h-screen mb-20">
      <iframe
        title="Power BI Report"
        width="100%"
        height="100%"
        src={embedUrl}
        frameBorder="0"
        allowFullScreen={true}
        className="w-full h-full"
      ></iframe>
    </div>
  );
};

export default PowerBI;
