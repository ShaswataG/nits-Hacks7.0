import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import { CustomButton, Loader } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";

const Welcome = () => {
  const { loading, isLogged, setIsLogged, hasSeenWelcome, setHasSeenWelcome } =
    useGlobalContext();

  // Navigate to home if the user is already logged in or has seen the welcome screen
  useEffect(() => {
    if (!loading && (isLogged || hasSeenWelcome)) {
      router.push("/home");
    }
  }, [loading, isLogged, hasSeenWelcome]);

  const handleContinue = () => {
    setHasSeenWelcome(true); // Mark that the user has seen the welcome screen
    setIsLogged(true); // Mark as logged in to proceed to the tab view
    router.push("/home"); // Navigate to the home tab
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <Loader isLoading={loading} />

      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-100% flex justify-center items-center h-full">
          <Image
            source={images.logo}
            className="w-[300px] h-[64px] my-10"
            resizeMode="contain"
          />

          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[298px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-xl text-white font-bold text-center my-3">
              Empowering Healthy Screen Time{"\n"}
              Focus, Learn, and Grow with{"\n"}
            </Text>

            <Text className="text-secondary font-bold text-center text-3xl">
              BriteTime!
            </Text>
          </View>

          <Text className="text-sm font-pregular text-gray-100 my-7 text-center">
            Fostering Balanced Screen Time: Focus, Play, and Thrive! Unlock a
            World of Learning and Growth!
          </Text>

          <CustomButton
            title="Continue"
            handlePress={handleContinue} // Call the function when the button is pressed
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
