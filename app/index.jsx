import {ScrollView, StyleSheet, Text, View, TouchableOpacity,  } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'; //para sa icons

export default function Page() {
  return (
    <View style={styles.container}>
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.home}>Home</Text>
        <Text style={styles.expire}>Expiring Soon</Text>
      </View>

      {/* Example cards, replace with dynamic content as needed */}

      <View>
        <Text style={styles.card}>
          <Text>Milk</Text>
          {"\n"}
          <Text>Wednesday, April 24</Text>

          <Text>{"\n"}Banana</Text>
          {"\n"}
          <Text>Friday, April 24</Text>
        </Text>
      </View>
    </ScrollView>
    

    {/* Centered Add Item button above footer */}
    <View style={styles.additem}>
      <TouchableOpacity
        style={styles.additemButton}
        onPress={() => console.log("Add Item Pressed")}
        activeOpacity={0.7}
      >
        <Text style={styles.additemText}>Add Item</Text>
      </TouchableOpacity>
    </View>
    


      {/* Footer navigation !!!!! */}



      <View style={styles.footer}>
          <TouchableOpacity onPress={() => console.log("Home Pressed")} style={styles.iconButton}>
            <MaterialIcons name="home" size={32} color="#000000be" />
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Inventory Pressed")} style={styles.iconButton}>
            <MaterialCommunityIcons name="fridge" size={32} color="#000000be" />
            <Text>Inventory</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Recipe Pressed")} style={styles.iconButton}>
            <MaterialCommunityIcons name="chef-hat" size={32} color="#000000be" />
            <Text>Recipe</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Community Pressed")} style={styles.iconButton}>
            <MaterialIcons name="people" size={32} color="#000000be" />
            <Text>Community</Text>
          </TouchableOpacity>
        </View>
      </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
  },

  //header fucking shit
  header: {
    flex: 1,
    justifyContent: "flex-start",
    maxHeight: 130,
    //backgroundColor: "#e6cbcbff",
    marginTop: 20,
    padding: 20
  },
  home: {
    fontSize: 40,
    fontWeight: "bold",
  },



  //cards ug additem fucking shit

  card: {
    justifyContent: "flex-start", 
    maxHeight: 130,
    marginTop: 20,
    padding: 20

  },

  expire: {
    fontSize: 20,
    color: "#03720df5",
    fontWeight: "bold",
  },

  additem:{
    width: "100%",
    alignItems: "center",
    marginBottom: 16, // space above footer
  },
  additemButton: {
    backgroundColor: '#3b910ae5',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    elevation: 2,
    width: 300,
    alignItems: 'center',
  },
  additemText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  //footer fucking shit


  footer:{
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: 80,
    backgroundColor: "#ffffffff",
    bottom: 0,
    borderTopWidth: 1,
    borderColor: "#ffffffff"
  },
  iconButton:{
    alignItems: "center",
  }



});
