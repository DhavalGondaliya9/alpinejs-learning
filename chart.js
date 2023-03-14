let itemData = [
  {
    id: 1,
    name: "Kit Kat",
    image: "https://picsum.photos/50/50",
    price: 10,
    discount: 5,
    tax: 18,
    quantity: 5,
  },
  {
    id: 2,
    name: "Dairy Milk",
    image: "https://picsum.photos/50/50",
    price: 15,
    discount: 5,
    tax: 18,
    quantity: 5,
  },
  {
    id: 3,
    name: "Juice",
    image: "https://picsum.photos/50/50",
    price: 25,
    discount: 5,
    tax: 18,
    quantity: 5,
  },
  {
    id: 4,
    name: "Waffle",
    price: 60,
    image: "https://picsum.photos/50/50",
    discount: 5,
    tax: 18,
    quantity: 5,
  },
  {
    id: 5,
    name: "Biscuit",
    price: 80,
    image: "https://picsum.photos/50/50",
    discount: 5,
    tax: 18,
    quantity: 5,
  },
];

function loadItems() {
  return {
    search: "",
    cartItems: [],
    subtotal: 0,
    discount: 0,
    tax: 0,
    total: 0,
    itemData: itemData,
    filteredItems() {
      return this.itemData.filter((item) => {
        return (item.name + item.price)
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    },
    addToCart(id) {
      let cartItem = this.cartItems.find((item) => item.id === id);
      let index = itemData.findIndex((item) => item.id === id);
      let newItem = this.itemData[index];
      if (this.itemData[index].quantity == 0) {
        alert("sold out this product");
        return false;
      }
      this.itemData[index].quantity -= 1;
      if (!cartItem) {
        this.cartItems.push({
          id: newItem.id,
          name: newItem.name,
          image: newItem.image,
          quantity: 1,
          price: newItem.price,
          discount: newItem.discount,
          tax: newItem.tax,
          visible: newItem.tax,
        });
      } else {
        cartItem.quantity += 1;
      }
      this.updateTotal();
    },

    removeItem(cartItem) {
      if (this.cartItems.length == 1) {
        if (confirm("Are Your Sure to Remove")) {
          this.cartItems.splice(this.cartItems.indexOf(cartItem.id), 1);
          this.updateTotal();
        }
        return;
      }
      let item = this.getItem(cartItem.id);
      item.quantity += cartItem.quantity;
      this.cartItems.splice(this.cartItems.indexOf(cartItem.id), 1);
      this.updateTotal();
    },
    clearAll() {
      this.cartItems.find((value, i) => {
        this.itemData.find((x) => x.id === value.id).quantity += value.quantity;
      });
      this.cartItems = [];
      this.updateTotal();
    },
    addQuantity(cartItem) {
      let item = this.getItem(cartItem.id);
      if (item.quantity == 0) {
        alert("only " + cartItem.quantity + " quantity available");
        return false;
      }
      item.quantity -= 1;
      cartItem.quantity += 1;
      this.updateTotal();
    },
    reduceQuantity(cartItem) {
      let item = this.getItem(cartItem.id);
      if (cartItem.quantity == 1) {
        this.cartItems.splice(this.cartItems.indexOf(cart), 1);
      }
      item.quantity += 1;
      cartItem.quantity -= 1;
      this.updateTotal();
    },
    changeQuantity(event, cart) {
      let item = this.getItem(cart.id);
      let totalQuantity = parseInt(item.quantity + cart.quantity);
      if (totalQuantity < event.target.value) {
        alert("sold out");
        event.target.value = cart.quantity;
        return false;
      }
      if (event.target.value < 1) {
        item.quantity += cart.quantity;
        this.cartItems.splice(this.cartItems.indexOf(cart), 1);
      }
      if (cart.quantity > event.target.value) {
        item.quantity += cart.quantity - event.target.value;
      }
      if (cart.quantity < event.target.value) {
        item.quantity -= event.target.value - cart.quantity;
      }
      cart.quantity = event.target.value;
      this.updateTotal();
    },
    getItem(id) {
      return this.itemData.find((item) => item.id === id);
    },

    updateTotal() {
      this.subtotal = 0;
      this.total = 0;
      this.discount = 0;
      this.tax = 0;
      this.cartItems = this.cartItems.map((item) => {
        this.subtotal += item.price * item.quantity;
        this.discount += (item.price * item.quantity * item.discount) / 100;
        this.tax = (this.subtotal * 18) / 100;
        this.total = this.subtotal + this.tax - this.discount;
        return item;
      });
      this.subtotal = this.subtotal.toFixed(2);
      this.discount = this.discount.toFixed(2);
      this.tax = this.tax.toFixed(2);
      this.total = this.total.toFixed(2);
    },
  };
}

function loadcart() {
  console.log('okok');
}
