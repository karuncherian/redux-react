import React, { Component } from "react";
import { pages } from "./Constants";
import ProductList from "./Components/ProductList";
import CartList from "./Components/CartList";
import Button from "./Components/Button";
import { getProducts, findProductById } from "./api";

// App Component (is a stateful component)
export default class App extends Component {
  constructor(props) {
    super(props);
    // Sets the initial state.
    this.state = {
      currentPage: pages.PRODUCT_LIST, // Initial page is PRODUCT_LIST
      isLoading: true, // Should show loading until the products are loaded.
      products: [], // Initially the products list is empty
      cart: [], // Initially the cart list is empty
      count: [], //Initially the count is empty
      totalCount: 0, //Initially totalCount is zero
      totalPrize: 0 //Initially totalPrize is zero
    };
  }

  /**
   * componentDidMount is a React lifecycle method
   * that would be called immediately after the component is
   * mounted in the DOM.
   * Should make all the asynchronous or side effect casusing calls
   * from here.
   * Since we are using `await` inside this method
   * `async` is needed in front of this method signature.
   */
  async componentDidMount() {
    // Get the products this is an async function
    // returns a Promise
    const products = await getProducts();
    // Sets the products and isLoading to false
    this.setState({ products, isLoading: false });
  }

  /**
   * Sets the currentPage as CART_LIST
   */
  goToCart = () => {
    this.setState({
      currentPage: pages.CART_LIST
    });
  };

  /**
   * Sets the currentPage as PRODUCT_LIST
   */
  goToCatalog = () => {
    this.setState({
      currentPage: pages.PRODUCT_LIST
    });
  };

  /**
   * Remove from cart list.
   */
  removeFromCart = cartId => {
    var index1, index2;
    index1 = this.state.cart.findIndex(element => element.id === cartId);
    var itemPrice = this.state.cart.map(ele => {
      if (ele.id === cartId) {
        return ele.price;
      }
    });
    this.state.cart.splice(index1, 1);
    index2 = this.state.count.findIndex(element => element.id === cartId);
    var itemCount = this.state.count.map(ele => {
      if (ele.id === cartId) {
        return ele.count;
      }
    });
    this.state.count.splice(index2, 1);
    this.setState({
      totalCount: this.state.totalCount - itemCount[index1]
    });
    this.setState({
      totalPrize: this.state.totalPrize - itemCount[index1] * itemPrice[index2]
    });
  };

  /**
   * Delete Single item from cart.
   */
  deleteFromCart = cartId => {
    var index1, index2;
    index2 = this.state.count.findIndex(element => element.id === cartId);
    var itemCount = this.state.count.map(ele => {
      if (ele.id === cartId) {
        return ele.count;
      }
    });

    if (itemCount[index2] > 0) {
      index1 = this.state.cart.findIndex(element => element.id === cartId);
      var itemPrice = this.state.cart.map(ele => {
        if (ele.id === cartId) {
          return ele.price;
        }
      });

      index2 = this.state.count.findIndex(element => element.id === cartId);
      var itemCount = this.state.count.map(ele => {
        if (ele.id === cartId) {
          return ele.count--;
        }
      });
      if (itemCount[index2] === 1) {
        this.state.cart.splice(index1, 1);
        this.state.count.splice(index2, 1);
      }

      this.setState({
        totalCount: this.state.totalCount - 1,
        totalPrize: this.state.totalPrize - itemPrice[index1]
      });
    }
  };

  /**
   * Edit the cart list.
   */
  editCount = cartId => {
    var value = document.getElementById(cartId).value;
    var numberCheck = document.getElementById(cartId);
    numberCheck.onkeydown = function(e) {
      if (
        !(
          (e.keyCode > 95 && e.keyCode < 106) ||
          (e.keyCode > 47 && e.keyCode < 58) ||
          e.keyCode === 8
        )
      ) {
        return false;
      }
    };
    var index1, index2;
    index2 = this.state.count.findIndex(element => element.id === cartId);
    var itemCount = this.state.count.map(ele => {
      if (ele.id === cartId) {
        var instantCount = ele.count;
        ele.count = value;
        return instantCount;
      }
    });

    index1 = this.state.cart.findIndex(element => element.id === cartId);
    var itemPrice = this.state.cart.map(ele => {
      if (ele.id === cartId) {
        return ele.price;
      }
    });
    if (value === "0") {
      this.state.cart.splice(index1, 1);
      this.state.count.splice(index2, 1);
    }
    value = value - itemCount[index2];
    this.setState({
      totalCount: this.state.totalCount + value,
      totalPrize: this.state.totalPrize + itemPrice[index1] * value
    });

    console.log(this.state.totalCount, this.state.totalCount);
  };

  /**
   * Add product to the cart list
   */
  addToCart = productId => {
    const { cart } = this.state;
    const { count } = this.state;
    const product = findProductById(productId);
    this.setState({
      totalCount: this.state.totalCount + 1,
      totalPrize: this.state.totalPrize + product.price
    });
    if (cart.includes(product)) {
      const [itemCount] = count.filter(({ id }) => productId === id);
      itemCount.count++;
    } else {
      this.setState({
        cart: [...cart, product],
        count: count.concat({ id: product.id, count: 1 })
      });
    }
  };

  render() {
    const { isLoading, currentPage, cart, products } = this.state;

    if (isLoading) {
      return <div className="loading">Loading...</div>;
    }

    const listing =
      currentPage === pages.PRODUCT_LIST ? (
        <ProductList products={products} addToCart={this.addToCart} />
      ) : (
        <CartList
          cart={cart}
          count={this.state.count}
          totalPrize={this.state.totalPrize}
          removeFromCart={this.removeFromCart}
          addToCart={this.addToCart}
          deleteFromCart={this.deleteFromCart}
          editCount={this.editCount}
        />
      );

    let navBtnMsg, navBtnFn;
    if (currentPage === pages.PRODUCT_LIST) {
      navBtnMsg = `Cart(${this.state.totalCount})`;
      navBtnFn = this.goToCart;
    } else {
      navBtnMsg = "Back";
      navBtnFn = this.goToCatalog;
    }

    return (
      <div>
        <Button
          className="goto-cart-btn"
          onClick={navBtnFn}
          message={navBtnMsg}
        />
        {listing}
      </div>
    );
  }
}
