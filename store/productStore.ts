import { create } from "zustand";


type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
};

type ProductStore = {
  products: Product[];
  cart: Product[];
  favorites: number[];
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (productId: number) => void;
  toggleFavorite: (productId: number) => void;
};
   
export const useProductStore = create<ProductStore>((set) => ({
  products: [
    {
      id: 1,
      name: "Nike Sportswear Club Fleece",
      price: 30.99,
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80",
    },
    {
      id: 2,
      name: "Product 2",
      price: 19.99,
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80",
    },
    {
      id: 3,
      name: "Product 3",
      price: 7.99,
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80",
    },
    {
      id: 4,
      name: "Product 4",
      price: 15.99,
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80",
    },
  ],
  cart: [],
  favorites: [],
  addProductToCart: (product) =>
    set((state) => ({ cart: [...state.cart, product] })),
  removeProductFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((product) => product.id !== productId),
    })),
  toggleFavorite: (productId) =>
    set((state) => ({
      favorites: state.favorites.includes(productId)
        ? state.favorites.filter((id) => id !== productId)
        : [...state.favorites, productId],
    })),
}));
