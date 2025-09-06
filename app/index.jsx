import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

function Card({ name, expiry, onPress, isExpiringSoon, isExpired }) {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        isExpiringSoon && styles.expiringCard,
        isExpired && styles.expiredCard,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View>
        <Text style={styles.cardName}>{name}</Text>
        <Text
          style={[
            styles.cardExpiry,
            isExpiringSoon && styles.expiringText,
            isExpired && styles.expiredText,
          ]}
        >
          {expiry}
        </Text>
      </View>

      
      <MaterialIcons name="chevron-right" size={28} color="#03720df5" />
    </TouchableOpacity>
  );
}

export default function Page() {
  const [items, setItems] = useState([
    { name: "Banana", expiry: "2025-09-21" },
    { name: "Milk", expiry: "2025-09-24" },
    { name: "Bread", expiry: "2025-06-26" },
    { name: "Eggs", expiry: "2025-06-15" }, // expired example
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemExpiry, setNewItemExpiry] = useState("");
  const [expiredCount, setExpiredCount] = useState(0);

  // Calculate expired items & sort
  useEffect(() => {
    const today = new Date();
    const expired = items.filter(
      (item) => new Date(item.expiry) < today
    ).length;
    setExpiredCount(expired);

    // Sort items by expiry date
    const sortedItems = [...items].sort(
      (a, b) => new Date(a.expiry) - new Date(b.expiry)
    );
    setItems(sortedItems);
  }, [items.length]);

  const addItem = () => {
    if (newItemName.trim() === "" || newItemExpiry.trim() === "") {
      alert("Please enter both name and expiry date (YYYY-MM-DD)!");
      return;
    }

    setItems([...items, { name: newItemName, expiry: newItemExpiry }]);
    setNewItemName("");
    setNewItemExpiry("");
    setModalVisible(false);
  };

  const handleCardPress = (item) => {
    Alert.alert("Item Details", `${item.name}\nExpiry: ${item.expiry}`);
  };

  const isExpiringSoon = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 3;
  };

  const isExpired = (expiryDate) => {
    return new Date(expiryDate) < new Date();
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.ecopan}>ecoPan v.1</Text>
            <Text style={styles.home}>Home</Text>
            <Text style={styles.expire}>Expiring Soon</Text>
          </View>

          {/* Expired items counter */}
          <View style={styles.expiredBox}>
            <MaterialIcons name="warning" size={22} color="#ff3b30" />
            <Text style={styles.expiredCount}>Expired: {expiredCount}</Text>
          </View>
        </View>

        {/* magrender ug sort sa cards */}
        {items
          .sort((a, b) => new Date(a.expiry) - new Date(b.expiry))
          .map((item, idx) => (
            <Card
              key={idx}
              name={item.name}
              expiry={item.expiry}
              onPress={() => handleCardPress(item)}
              isExpiringSoon={isExpiringSoon(item.expiry)}
              isExpired={isExpired(item.expiry)}
            />
          ))}
      </ScrollView>

      {/* Add item button */}
      <View style={styles.additem}>
        <TouchableOpacity
          style={styles.additemButton}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.additemText}>Add Item</Text>
        </TouchableOpacity>
      </View>

      {/* Modal add item */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Add New Item</Text>

            <TextInput
              style={styles.input}
              placeholder="Item Name"
              value={newItemName}
              onChangeText={setNewItemName}
            />

            <TextInput
              style={styles.input}
              placeholder="Expiry Date (YYYY-MM-DD)"
              value={newItemExpiry}
              onChangeText={setNewItemExpiry}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#3b910a" }]}
                onPress={addItem}
              >
                <Text style={styles.modalButtonText}>Add</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#ff3b30" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Footer wako kasabot sa touchable opacity aynalang na hilabti ah */}
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => console.log("Home Pressed")}
          style={styles.iconButton}
        >
          <MaterialIcons name="home" size={32} color="#000000be" />
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log("Inventory Pressed")}
          style={styles.iconButton}
        >
          <MaterialCommunityIcons name="fridge" size={32} color="#000000be" />
          <Text>Inventory</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log("Recipe Pressed")}
          style={styles.iconButton}
        >
          <MaterialCommunityIcons name="chef-hat" size={32} color="#000000be" />
          <Text>Recipe</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log("Community Pressed")}
          style={styles.iconButton}
        >
          <MaterialIcons name="people" size={32} color="#000000be" />
          <Text>Community</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    width: "100%",
    maxHeight: 130,
    marginTop: 20,
    padding: 10,
    marginLeft: 10,
    marginRight: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  home: { fontSize: 40, fontWeight: "bold" },
  expire: { fontSize: 20, color: "#03720df5", fontWeight: "bold" },
  expiredBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffe5e5",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    elevation: 2,
    marginRight: 20,
  },
  expiredCount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff3b30",
    marginLeft: 5,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  expiringCard: {
    backgroundColor: "#fff2e6", // Light orange background
  },
  expiredCard: {
    backgroundColor: "#ffe5e5", // Light red background
  },
  cardName: { fontSize: 18, fontWeight: "bold", marginBottom: 6 },
  cardExpiry: { fontSize: 14, color: "#03720df5" },
  expiringText: { color: "#ff9800", fontWeight: "bold" },
  expiredText: { color: "#ff3b30", fontWeight: "bold" },
  additem: {
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
  },
  additemButton: {
    backgroundColor: "#3b910ae5",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    elevation: 2,
    width: 300,
    alignItems: "center",
  },
  additemText: { color: "white", fontSize: 16, fontWeight: "bold" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalBox: {
    backgroundColor: "white",
    width: 300,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: { color: "white", fontWeight: "bold" },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: 80,
    backgroundColor: "#fff",
    bottom: 0,
    borderTopWidth: 1,
    borderColor: "#ffffffff",
  },
  iconButton: { alignItems: "center" },
});
