import { Image, StyleSheet, TextInput, Button } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import { useQuery, useRealm } from "../libs/realm";
import { InputRealm } from "../libs/realm/schemas/input";
import { useNetInfo } from "@react-native-community/netinfo";

export default function HomeScreen() {
  const [data, setData] = useState("");
  const realm = useRealm();
  const takeRealm = useQuery(InputRealm);
  const netInfo = useNetInfo();

  function fetchInput() {
    console.log(takeRealm, "take realm data");
  }

  function handleSubmit() {
    netInfo.isWifiEnabled = false;
    try {
      !netInfo.isConnected
        ? realm.write(() => {
            realm.create(
              "InputRealm",
              InputRealm.generate({
                description: data,
              })
            );
          })
        : console.log("you are connected", data);
    } catch (error) {
      console.log("Error", error);
    }
  }
  useEffect(() => {
    fetchInput();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <TextInput
        placeholder="insert one description"
        style={{ borderWidth: 1, borderColor: "black", height: 40, padding: 5 }}
        value={data}
        onChangeText={setData}
      />
      <Button title="send" onPress={() => handleSubmit()} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
