import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useProductStore } from "../store/productStore";
import { Ionicons } from "@expo/vector-icons";

const CartScreen = () => {
  const cart = useProductStore((state) => state.cart);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart Screen</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() =>
                  useProductStore.setState({
                    cart: useProductStore
                      .getState()
                      .cart.filter((product) => product.id !== item.id),
                  })
                }
              >
                <Text style={styles.removeButtonText}>Remove from Cart</Text>
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
  removeButton: {
    backgroundColor: "red",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginTop: 10,
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CartScreen;
