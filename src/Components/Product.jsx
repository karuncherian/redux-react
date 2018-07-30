import React from "react";

// Product component (is a Stateless component)
export default ({ id, name, price, children }) => (
  <li className="product">
    <div className="inline">
      Product: {name} <br />
      Price: {price} <br />
      {children}
    </div>
  </li>
);
