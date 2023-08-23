import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useProductStore } from "../store/productStore";
import { Ionicons } from "@expo/vector-icons";

const FavoritesScreen = () => {
  const favorites = useProductStore((state) => state.favorites);
  const products = useProductStore((state) => state.products);

  const favoriteProducts = products.filter((product) =>
    favorites.includes(product.id)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites Screen</Text>
      <FlatList
        data={favoriteProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
              <TouchableOpacity
                onPress={() =>
                  useProductStore.setState({
                    favorites: favorites.filter((id) => id !== item.id),
                  })
                }
              >
                <Ionicons name="heart" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

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
});

export default FavoritesScreen;
