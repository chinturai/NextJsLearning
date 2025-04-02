import React from "react";

const Ping = () => {
  return (
    <div className="relative">
      <div className="absolute -right-2 -top-6">
        <span className="flex size-[16px]">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex size-[16px] rounded-full bg-primary"></span>
        </span>
      </div>
    </div>
  );
};
export default Ping;