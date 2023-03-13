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
    filteredItems() {
      return itemData.filter((item) => {
        return (item.name + item.price)
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    },
    addItem(id) {
      // if (this.cartItems.length > 0) {
      //   const newItemIndex = this.cartItems.findIndex((item) => item.id === id);
      //   if (newItemIndex !== -1) {
      //     let index = this.cartItems.findIndex((item) => item.id === id);
      //     this.cartItems[index].quantity += 1;
      //   } else {
      //     this.cartItems.push(itemData[newItemIndex]);
      //   }
      //   this.updateTotal();
      //   return;
      // }
      // this.cartItems.push(itemData[newItemIndex]);
      // this.updateTotal();
      const cartItem = this.cartItems.find((item) => item.id === id);
      if (!cartItem) {
        const newItem = itemData.find((item2) => item2.id === id);
        newItem.quantity = 1;
        this.cartItems.push(newItem);
        // this.cartItems.push({
        //   id: newItem.id,
        //   name: newItem.name,
        //   image: newItem.image,
        //   quantity: 1,
        //   price: newItem.price,
        //   discount: newItem.discount,
        //   tax: newItem.tax,
        //   visible: newItem.tax,
        // });
      } else {
        cartItem.quantity += 1;
      }
      console.log(itemData);
      this.updateTotal();
    },

    removeItem(id) {
      this.cartItems.splice(this.cartItems.indexOf(id), 1);
      this.updateTotal();
    },
    clearAll() {
      this.cartItems = [];
      this.updateTotal();
    },
    addQuantity(cartItem) {
      console.log('1');
      cartItem.quantity += 1;
      this.updateTotal();
    },
    reduceQuantity(cartItem) {
      if (cartItem.quantity == 1) {
        this.cartItems.splice(this.cartItems.indexOf(cart), 1);
      }
      cartItem.quantity -= 1;
      this.updateTotal();
    },
    changeQuantity(event, cart) {
      if (event.target.value < 1) {
        this.cartItems.splice(this.cartItems.indexOf(cart), 1);
      }
      cart.quantity = event.target.value;
      this.updateTotal();
    },

    updateTotal() {
      this.subtotal = 0;
      this.total = 0;
      this.discount = 0;
      this.tax = 0;
      this.cartItems = this.cartItems.map((item) => {
        this.subtotal += item.price * item.quantity;
        this.discount += ((item.price * item.quantity) * item.discount) / 100;
        this.tax = (this.subtotal * 18) / 100;
        this.total = this.subtotal + this.tax - this.discount;
        return item;
      });
    },
  };
}
