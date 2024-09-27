import { defineStore } from "pinia";

export const useStore = defineStore("main", {
  state: () => ({
    isAuthenticated: false,
    cartCount: 0,
    cartItems: [],
    products: [],
    team: [],
  }),

  actions: {
    setAuthentication(status) {
      this.isAuthenticated = status;
    },
    setCartCount(count) {
      this.cartCount = count;
    },
    setCartItems(items) {
      this.cartItems = items;
    },
    setProducts(products) {
      this.products = products;
    },
    setTeam(team) {
      this.team = team;
    },

    async fetchTeam() {
      try {
        const response = await fetch("http://localhost:3000/team-members");
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        this.setTeam(result);
      } catch (error) {
        console.error(error);
      }
    },

    async fetchProducts() {
      try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) throw new Error("Network response was not ok");
        const products = await response.json();
        const productsWithQuantity = products.map((product) => ({
          ...product,
          quantity: 0,
        }));
        this.setProducts(productsWithQuantity);
      } catch (error) {
        console.error(error);
      }
    },

    async login({ email, password }) {
      try {
        const response = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
        if (response.ok) {
          localStorage.setItem("authToken", result.token);
          this.setAuthentication(true);
          this.initializeCart();
        } else {
          console.error("Login error:", result.msg);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },

    async register({ name, email, password }) {
      try {
        const response = await fetch("http://localhost:3000/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.msg || "Registration failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },

    logout() {
      localStorage.removeItem("authToken");
      this.setAuthentication(false);
    },

    updateCart({ item, action }) {
      let cartItems = [...this.cartItems];
      if (action === "add") {
        const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          item.quantity++;
          cartItems.push(item);
        }
      } else if (action === "remove") {
        cartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
      } else if (action === "update") {
        const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
          existingItem.quantity = item.quantity;
          if (existingItem.quantity < 1) {
            this.updateCart({ item: existingItem, action: "remove" });
          }
        }
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);

      this.setCartItems(cartItems);
      this.setCartCount(totalCount);
    },

    initializeCart() {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);
      this.setCartItems(cartItems);
      this.setCartCount(totalCount);
    },

    initializeAuth() {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        this.setAuthentication(true);
      } else {
        this.setAuthentication(false);
      }
    },
  },
});
