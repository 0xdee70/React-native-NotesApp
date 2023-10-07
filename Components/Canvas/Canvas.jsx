import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, IconButton, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DragTextEditor } from "react-native-drag-text-editor";
import ViewShot from "react-native-view-shot";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CanvasEditorScreen = ({ route }) => {
  const { savedText } = route.params || { savedText: "" };
  const [canvasTexts, setCanvasTexts] = useState([]);
  const [selectedTextIndex, setSelectedTextIndex] = useState(null);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const navigation = useNavigation();
  const viewShotRef = useRef(null);

  const captureCanvas = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      saveCanvas(uri);
    } catch (error) {
      console.log(error);
    }
  };

  const undo = () => {
    if (undoStack.length > 0) {
      const lastAction = undoStack.pop();
      setRedoStack((prev) => [...prev, lastAction]);

      switch (lastAction.type) {
        case "add":
          setCanvasTexts((prevTexts) =>
            prevTexts.filter((_, index) => index !== lastAction.index)
          );
          break;
        case "delete":
          setCanvasTexts((prevTexts) => [
            ...prevTexts.slice(0, lastAction.index),
            lastAction.text,
            ...prevTexts.slice(lastAction.index),
          ]);
          break;
        default:
          break;
      }
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const nextAction = redoStack.pop();
      setUndoStack((prev) => [...prev, nextAction]);

      switch (nextAction.type) {
        case "add":
          setCanvasTexts((prevTexts) => [...prevTexts, nextAction.text]);
          break;
        case "delete":
          setCanvasTexts((prevTexts) =>
            prevTexts.filter((_, index) => index !== nextAction.index)
          );
          break;
        default:
          break;
      }
    }
  };

  const removeSelectedText = () => {
    if (selectedTextIndex !== null) {
      setUndoStack((prev) => [
        ...prev,
        {
          type: "delete",
          index: selectedTextIndex,
          text: canvasTexts[selectedTextIndex],
        },
      ]);

      setCanvasTexts((prevTexts) =>
        prevTexts.filter((_, index) => index !== selectedTextIndex)
      );

      setSelectedTextIndex(null);
    }
  };

  const saveCanvas = async (baseurl) => {
    try {
      await AsyncStorage.setItem("savedCanvases", baseurl);
      console.log("Image saved successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (savedText) {
      setCanvasTexts((prevTexts) => [...prevTexts, savedText]);
    }
  }, [savedText]);

  useEffect(() => {
    if (selectedTextIndex !== null && savedText) {
      setCanvasTexts((prevTexts) =>
        prevTexts.map((text, index) =>
          index === selectedTextIndex ? savedText : text
        )
      );
    }
  }, [savedText, selectedTextIndex]);

  return (
    <>
      <Appbar style={styles.appbar}>
        <IconButton
          icon={require("../../assets/back.png")}
          onPress={() => navigation.goBack()}
        />
        <IconButton icon={require("../../assets/down-l.png")} onPress={undo} />
        <IconButton icon={require("../../assets/down-r.png")} onPress={redo} />
        <Button onPress={captureCanvas}>Save</Button>
      </Appbar>
      <View style={styles.container}>
        <GestureHandlerRootView style={styles.container}>
          <ViewShot ref={viewShotRef} style={styles.canvas}>
            {canvasTexts.map((canvasText, index) => (
              <DragTextEditor
                key={index}
                value={canvasText}
                onItemActive={() => setSelectedTextIndex(index)}
              ></DragTextEditor>
            ))}
          </ViewShot>
        </GestureHandlerRootView>
        <View style={styles.button}>
          <View style={styles.textContainer}>
            <Button onPress={() => navigation.navigate("TextElementScreen")}>
              Add Text
            </Button>
          </View>

          <IconButton
            icon={require("../../assets/delete.png")}
            onPress={removeSelectedText}
            style={styles.crossIcon}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  appbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: "#f2f2f2",
    paddingVertical: 5,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  canvas: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  canvasText: {
    fontSize: 20,
    margin: 5,
  },
  selectedTextContainer: {
    backgroundColor: "#ccc",
  },
  crossIcon: {
    marginLeft: 10,
  },
  button: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default CanvasEditorScreen;
