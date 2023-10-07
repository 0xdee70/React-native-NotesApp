import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Button } from "react-native";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button
          title="Create New"
          style={styles.button}
          onPress={() => navigation.navigate("CanvasEditorScreen")}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="My Projects"
          style={styles.button}
          onPress={() => navigation.navigate("MyProjects")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginVertical: 10,
  },
});

export default HomeScreen;
