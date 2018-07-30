import React from "react";
import Cart from "./Cart";
import RemoveFromCartButton from "./Button";
import DeleteFromCartButton from "./Button";
import AddFromCartButton from "./Button";
// CartList component (is a Stateless component)

export default ({
  cart,
  count,
  totalPrize,
  removeFromCart,
  addToCart,
  deleteFromCart,
  editCount
}) => {
  let itemCount = function(countId) {
    const [itemCount] = count.filter(({ id }) => countId === id);
    return itemCount.count;
  };
  return (
    <React.Fragment>
      <h2>Cart List ({`${cart.length}`})</h2>
      <ul>
        {cart.map((product, idx) => (
          <Cart key={idx} {...product} count={count}>
            <AddFromCartButton
              onClick={addToCart.bind(null, product.id)}
              message="+"
            />
            <br />
            <input
              type="number"
              className="individualCount"
              id={product.id}
              placeholder="Quantity:"
              value={itemCount(product.id)}
              min={0}
              onChange={editCount.bind(null, product.id)}
            />
            <DeleteFromCartButton
              onClick={deleteFromCart.bind(null, product.id)}
              message="-"
            />

            <RemoveFromCartButton
              onClick={removeFromCart.bind(null, product.id)}
              message="Remove From Cart"
            />
          </Cart>
        ))}
      </ul>
      <div>
        <span>Subtotal: </span>
        <strong>{totalPrize.toFixed(2)}</strong>
      </div>
    </React.Fragment>
  );
};
