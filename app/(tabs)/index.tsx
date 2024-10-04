import {
  Image,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Text,
} from "react-native";

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
  const [dataOffline, setDataOffline] = useState<string[]>([]);

  const realm = useRealm();
  const takeRealm = useQuery(InputRealm);
  const netInfo = useNetInfo();

  function fetchInput() {
    return takeRealm;
  }

  function clearRealm() {
    realm.write(() => {
      realm.deleteAll();
    });
  }

  function synchronizeRealm() {
    if (netInfo.isConnected && dataOffline) {
      realm.write(() => {
        dataOffline.forEach((item) => {
          realm.create(
            "InputRealm",
            InputRealm.generate({
              description: item,
            })
          );
        });
      });
      setDataOffline([]);
      setData("");
    }
  }

  function handleSubmit() {
    try {
      if (netInfo.isConnected) {
        realm.write(() => {
          realm.create(
            "InputRealm",
            InputRealm.generate({
              description: data,
            })
          );
        });
        setData("");
        Alert.alert("Insert database storage");
      } else {
        setDataOffline((prevData) => [...prevData, data]);
        setData("");
        Alert.alert("Insert in local storage");
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

  useEffect(() => {
    fetchInput();
  }, [netInfo.isConnected]);

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
        <ThemedText type="title">Welcome Leandro!</ThemedText>
        <HelloWave />
      </ThemedView>
      <TextInput
        placeholder="insert one description"
        style={{ borderWidth: 1, borderColor: "black", height: 40, padding: 5 }}
        value={data}
        onChangeText={setData}
      />
      <Button title="send" onPress={() => handleSubmit()} />
      {fetchInput().map((item) => {
        return <Text>{item.description}</Text>;
      })}
      <Button title="clear Realm" onPress={() => clearRealm()} />
      <Button
        disabled={!netInfo.isConnected}
        title={"synchronize"}
        onPress={() => synchronizeRealm()}
      />
      {!netInfo.isConnected && (
        <Text>
          You are offline, when you have connection, synchronization will be
          enabled.
        </Text>
      )}
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
