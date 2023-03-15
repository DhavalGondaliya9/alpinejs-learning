let cartItems = [];
function displayItems() {
    return {
        search: "",
        cartItems: cartItems,

        get filteredItems() {
            return items.filter((item) => {
                return (item.name + "$" + item.price)
                .toLowerCase()
                .includes(this.search.toLowerCase());
            });
        },

        cartQuantity(id) {
            let cart = this.cartItems.find((item) => item.id === id);
            if (cart) {
                return cart.quantity;
            }
            return 0;
        },
    };
}
function displayCart() {
    return {
        cartItems: cartItems,
        subtotal: 0,
        discount: 0,
        tax: 0,
        total: 0,
        addToCart(id) {
            let cartItem = this.cartItems.find((item) => item.id === id);
            let index = items.findIndex((item) => item.id === id);
            let newItem = items[index];
            if (!cartItem) {
                this.cartItems.push({
                id: newItem.id,
                name: newItem.name,
                image: newItem.image,
                quantity: 1,
                price: newItem.price,
                discount: newItem.discount,
                tax: newItem.tax,
                });
            } else {
                if (items[index].quantity == cartItem.quantity) {
                    alert("sold out this product");
                    return;
                }
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
            this.cartItems.splice(this.cartItems.indexOf(cartItem.id), 1);
            this.updateTotal();
        },

        clearAll() {
            this.cartItems.splice(0, this.cartItems.length);
            this.updateTotal();
        },

        addQuantity(cartItem) {
            let item = this.getItem(cartItem.id);
            if (item.quantity == cartItem.quantity) {
                alert("only " + cartItem.quantity + " quantity available");
                return false;
            }
            cartItem.quantity += 1;
            this.updateTotal();
        },

        reduceQuantity(cartItem) {
            if (cartItem.quantity == 1) {
                this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
            }
            cartItem.quantity -= 1;
            this.updateTotal();
        },

        changeQuantity(event, cart) {
            let item = this.getItem(cart.id);
            if (item.quantity < event.target.value) {
                alert("only " + item.quantity + " quantity available");
                event.target.value = cart.quantity;
                return false;
            }
            if (event.target.value < 1) {
                this.cartItems.splice(this.cartItems.indexOf(cart), 1);
            }
            cart.quantity = event.target.value;
            this.updateTotal();
        },

        getItem(id) {
            return items.find((item) => item.id === id);
        },

        updateTotal() {
            this.subtotal = 0;
            this.total = 0;
            this.discount = 0;
            this.tax = 0;
            cartItems = this.cartItems.map((item) => {
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
