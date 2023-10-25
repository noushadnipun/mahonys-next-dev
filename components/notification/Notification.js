import React from "react";

const Notification = ({ props }) => {
  const { pragraph } = props;
  return (
    <div className="shadow-sm border-5 border-start  border-primary">
      <p className="py-3 px-3">{pragraph}</p>
    </div>
  );
};

export default Notification;
