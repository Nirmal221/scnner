import axios from "axios";
import React, { useState, useEffect } from "react";
import { CameraView, Camera } from "expo-camera/next";
import {
  Text,
  View,
  StyleSheet,
  Linking,
  Button,
  Image,
  ActivityIndicator,
} from "react-native";

export default function App() {
  const [data, setData] = useState(null);
  const [apiData, setApiData] = useState({});
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    Camera.requestCameraPermissionsAsync().then(({ status }) =>
      setHasPermission(status === "granted")
    );
  }, []);

  useEffect(() => {
    data &&
      axios
        .get("https://entry.esfilesexplorer.com/api/get_data/" + data)
        .then(({ data }) => setApiData(data))
        .catch((e) => console.log("🚀 ~ axios.get ~ e:", e));
  }, [data]);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return (
      <Text onPress={() => Linking.openSettings()}>
        No access to camera Click to give camera permission
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      {!data ? (
        <CameraView
          style={StyleSheet.absoluteFillObject}
          onBarcodeScanned={({ data }) => setData(data)}
          barcodeScannerSettings={{ barCodeTypes: ["qr", "pdf417"] }}
        />
      ) : (
        <View style={styles.container}>
          <Image
            resizeMode="contain"
            source={require("./logo.png")}
            style={{ width: 200, height: 120, marginBottom: 20 }}
          />

          {!apiData ? (
            <ActivityIndicator size={"large"} />
          ) : (
            <View style={{ minWidth: 300 }}>
              <View style={styles.field}>
                <Text style={styles.title}>નામ:-</Text>
                <Text style={styles.desc}>{apiData?.name}</Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.title}>ગામ:-</Text>
                <Text style={styles.desc}>{apiData?.gam}</Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.title}>ફોન નં.:-</Text>
                <Text style={styles.desc}>{apiData?.phone}</Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.title}>રૂમ નં.:-</Text>
                <Text style={[styles.desc, { color: "red" }]}>
                  {apiData?.room_no}
                </Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.title}>બેડ:-</Text>
                <Text style={styles.desc}>{apiData?.bed}</Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.title}>AC/NON-AC:-</Text>
                <Text style={styles.desc}>{apiData?.ac_non_ac}</Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.title}>સંખ્યા:-</Text>
                <Text style={styles.desc}>{apiData?.no_of_person}</Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.title}>આશ્રમ:-</Text>
                <Text style={[styles.desc, { color: "red" }]}>
                  {apiData?.aashram}
                </Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.title}>રોકાણ દિવસ:-</Text>
                <Text style={styles.desc}>{apiData?.rokan_din}</Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.title}>રોકાણ દિવસ:-</Text>
                <Text style={styles.desc}>{apiData?.rokan_din}</Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.title}>રોકાણ તા:-</Text>
                <Text style={styles.desc}>{apiData?.rokan_start_date}</Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.title}>થી તા:-</Text>
                <Text style={styles.desc}>{apiData?.rokan_end_date}</Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.title}>નોધ:-</Text>
                <Text style={styles.desc}>{apiData?.note}</Text>
              </View>
            </View>
          )}

          <View style={{ paddingTop: 50 }}>
            <Button
              title="New Scan"
              onPress={() => (setData(false), setApiData(false))}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 26,
    fontWeight: "500",
  },
  field: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
