import React, { useState, useEffect } from "react";
import { Text, Image, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";

const Focus = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [focusTime, setFocusTime] = useState(30); // Default focus time in minutes
  const [breakTime, setBreakTime] = useState(0); // Break time in minutes
  const [timer, setTimer] = useState(focusTime * 60);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isFocused) {
      intervalId = setInterval(() => {
        if (timer > 0) {
          setTimer((prev) => prev - 1);
        } else {
          clearInterval(intervalId);
          setIsBreak((prev) => !prev);

          if (isBreak) {
            setTimer(focusTime * 60); // Reset to focus time
          } else {
            // Calculate break time
            const calculatedBreakTime =
              focusTime >= 60 ? 10 + Math.floor((focusTime - 60) / 30) * 10 : 0; // No break if focus time is less than 1 hour
            setBreakTime(calculatedBreakTime);
            setTimer(calculatedBreakTime * 60);
          }
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isFocused, timer, isBreak, focusTime]);

  const handleFocusStart = () => {
    setIsFocused(true);
    setTimer(focusTime * 60);

    // Calculate the break time immediately when starting focus
    if (focusTime >= 60) {
      const calculatedBreakTime = 10 + Math.floor((focusTime - 60) / 30) * 10;
      setBreakTime(calculatedBreakTime);
    } else {
      setBreakTime(0); // Reset break time if focus time < 60 mins
    }
  };

  const handleFocusEnd = () => {
    setIsFocused(false);
    setTimer(focusTime * 60);
  };

  const addTenMinutes = () => {
    setFocusTime((prev) => prev + 10);
  };

  const removeTenMinutes = () => {
    setFocusTime((prev) => (prev > 10 ? prev - 10 : prev)); // Minimum 10 minutes
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="p-4">
        <Text className="text-2xl font-bold text-white">Focus Timer</Text>
      </View>

      {isFocused ? (
        <View className="flex-1 items-center justify-between my-20">
          <Text className="text-5xl font-bold bg-white px-7 py-5 rounded-xl text-green-500">
            {formatTime(timer)}
          </Text>

          <View className="mt-20">
            <Image source={images.lofi} className="w-50 h-50" />
          </View>

          <View className="flex justify-end ">
            {/* Show break time only if focusTime > 60 */}
            {focusTime >= 60 && !isBreak && (
              <Text className="text-lg text-white py-10 my-10 text-center">
                Break in: {Math.floor(timer / (2 * 60 + 5))} mins
              </Text>
            )}

            <TouchableOpacity
              className="bg-red-900 px-8 py-4 rounded-full shadow-md"
              onPress={handleFocusEnd}
            >
              <Text className="text-white text-lg font-bold p-5">
                End Focus
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View className="flex-1 items-center justify-around">
          <Text className="text-3xl font-bold text-white">
            Set Your Focus Time
          </Text>

          <View className="flex-row items-center justify-center space-x-4">
            <TouchableOpacity
              className="bg-red-600 px-8 py-4 rounded-full shadow-md"
              onPress={removeTenMinutes}
            >
              <Text className="text-white text-lg font-bold">-10 Minutes</Text>
            </TouchableOpacity>

            <Text className="text-white text-3xl font-bold">
              {focusTime} mins
            </Text>

            <TouchableOpacity
              className="bg-green-700 px-8 py-4 rounded-full shadow-md"
              onPress={addTenMinutes}
            >
              <Text className="text-white text-lg font-bold">+10 Minutes</Text>
            </TouchableOpacity>
          </View>

          <Text className="text-lg text-white">
            Break Time:{" "}
            {focusTime < 60 ? 0 : 10 + Math.floor((focusTime - 60) / 30) * 10}{" "}
            mins
          </Text>

          <TouchableOpacity
            className="bg-green-900 px-8 py-4 rounded-full shadow-md"
            onPress={handleFocusStart}
          >
            <Text className="text-white text-lg font-bold p-5">
              Start Focus
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Focus;
