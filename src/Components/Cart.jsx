import React from "react";

// Cart component (is a Stateless component)

export default ({ id, name, price, count, children }) => {
  var total;
  let itemCount = function(countId) {
    const [itemCount] = count.filter(({ id }) => countId === id);
    return itemCount.count;
  };
  return (
    <li className="cart">
      <div className="inline">
        Product: {name + " "}
        <br />
        Price: {price} <br />
        Quantity: {(total = itemCount(id) + " ")}
        <br />
        Total Price: {price * total}
        <br />
        {children}
      </div>
    </li>
  );
};
