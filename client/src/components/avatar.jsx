import React from "react";

export default function Avatar({show}) {
  return (
    <div className="avatar">
      <div className={show}>
        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
      </div>
    </div>
  );
}
