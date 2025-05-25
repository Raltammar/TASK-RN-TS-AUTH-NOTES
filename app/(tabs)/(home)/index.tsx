import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import { useNavigation } from "expo-router";
import colors from "../../../data/styling/colors";
import Note from "../../../components/Note";
import AuthContext from "@/context/AuthContext";
import { deleteToken } from "@/api/storage";

const Home = () => {
  const navigation = useNavigation();
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = async () => {
    // console.log("logout pressed");
    await deleteToken();
    setIsAuthenticated(false);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const note = {
    _id: "1",
    title: "Note 1",
    topic: ["Topic 1", "Topic 2"],
    body: "Note Body",
    user: {
      _id: "1",
      name: "User 1",
      email: "user1@example.com",
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
    },
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}
    >
      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Note key={"1"} note={note} />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
