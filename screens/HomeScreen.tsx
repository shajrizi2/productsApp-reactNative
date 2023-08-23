import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useProductStore } from "../store/productStore";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "../components/SearchBar";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

const HomeScreen = () => {
  const products = useProductStore((state) => state.products);
  const favorites = useProductStore((state) => state.favorites);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const handleSearch = (searchText: string) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <SearchBar onSearch={handleSearch} />
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
              <View style={styles.iconContainer}>
                <TouchableOpacity
                  onPress={() => {
                    const isProductInCart = useProductStore
                      .getState()
                      .cart.some((product) => product.id === item.id);

                    if (!isProductInCart) {
                      useProductStore.setState({
                        cart: [...useProductStore.getState().cart, item],
                      });
                    }
                  }}
                >
                  <Ionicons name="cart-outline" size={24} color="green" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    if (favorites.includes(item.id)) {
                      useProductStore.setState({
                        favorites: favorites.filter((id) => id !== item.id),
                      });
                    } else {
                      useProductStore.setState({
                        favorites: [...favorites, item.id],
                      });
                    }
                  }}
                >
                  <Ionicons
                    name={
                      favorites.includes(item.id) ? "heart" : "heart-outline"
                    }
                    size={24}
                    color={favorites.includes(item.id) ? "red" : "black"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  productContainer: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: "#888",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
