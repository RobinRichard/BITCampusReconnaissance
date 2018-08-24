import React from "react";
import { View } from "react-native";
import { Button, FormLabel, FormInput } from "react-native-elements";
import { onSignIn } from "../auth";

export default ({ navigation }) => (
  <View>
      <FormLabel>Email</FormLabel>
      <FormInput placeholder="Email address..." />
      <FormLabel>Password</FormLabel>
      <FormInput secureTextEntry placeholder="Password..." />
      <Button
        buttonStyle={{ marginTop: 10, padding : 20 }}
        backgroundColor="#e8630a"
        title="SIGN IN"
        onPress={() => {
          onSignIn().then(() => navigation.navigate("SignedIn"));
        }}
      />
  </View>
);
