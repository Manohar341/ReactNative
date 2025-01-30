import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const MyOrders = () => {
  return (
    <ScrollView contentContainerStyle={styles.ordercontainer}>
      <Text style={styles.orderheader}> My Orders </Text>
      <View style={styles.ordercard}>
        <Text style={{ display: "flex", justifyContent: "space-between" }}>
          <Text style={styles.id}>#78488</Text>
          <Text style={styles.time}>Today 9:30 am</Text>
        </Text>
        <Text style={{ display: "flex", justifyContent: "space-between" }}>
          <Text style={styles.amount}>#78488</Text>
          <Text style={styles.confirm}>confirmed</Text>
        </Text>
        <Text style={styles.fooddelivery}>Food Delivery</Text>
        <View style={{ position: "relative" }}>
          <Text
            style={{
              display: "flex",
              gap: 5,
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text style={styles.round}>
              <Text style={styles.dotround}></Text>
            </Text>
            <Text style={styles.roundtext}>704 Progress Wy Sain</Text>
          </Text>
          <View>
            <View style={styles.dothead}>
              <View style={styles.dot}></View>
              <View style={styles.dot}></View>
              <View style={styles.dot}></View>
              <View style={styles.dot}></View>
            </View>
          </View>
        </View>
        <View style={styles.locationContainer}>
          <View style={styles.locationItem}>
            <MaterialIcons name="location-pin" size={18} color="red" />
          </View>
          <Text style={styles.address}>84 Elk Avenue, Flint, MI</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  ordercontainer: {
    flex: 1,
    alignItems: "center",
  },
  orderheader: {
    fontSize: 18,
    fontWeight: "600",
  },
  ordercard: {
    width: "90%",
    height: "auto",
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  id: {
    fontSize: 15,
    fontWeight: 600,
    paddingBottom: 8,
  },
  time: {
    fontSize: 14,
    color: "rgb(155 149 149)",
    paddingBottom: 8,
  },
  amount: {
    fontSize: 15,
    fontWeight: 600,
    paddingBottom: 8,
    color: "rgb(53 211 53)",
  },
  confirm: {
    fontSize: 14,
    paddingBottom: 8,
  },
  fooddelivery: {
    fontSize: 15,
    fontWeight: 600,
  },
  round: {
    width: 18,
    height: 18,
    borderRadius: 25,
    borderWidth: 2.7,
    borderColor: "rgb(51 215 51)",
    justifyContent: "center",
    alignItems: "center",
  },
  dotround: {
    width: 6,
    height: 6,
    borderRadius: 10,
    backgroundColor: "rgb(51 215 51)",
    position: "absolute",
    top: 4,
    left: 4,
  },
  dothead: {
    position: "absolute",
    top: 3,
    left: 8,
  },
  dot: {
    width: 1,
    height: 3,
    borderRadius: 3,
    backgroundColor: "black",
    marginBottom: 4,
  },
  roundtext: {
    fontSize: 14,
    color: "rgb(147 147 147)",
    fontWeight: 600,
  },
  locationContainer: {
    flexDirection: "row",
    display: "flex",
    gap: 5,

    alignItems: "center",
  },
  locationItem: {
    marginBottom: 5,
    marginTop: 18,
  },
  address: {
    fontSize: 14,
    color: "rgb(147 147 147)",
    fontWeight: 600,
    paddingTop: 10,
  },
});
