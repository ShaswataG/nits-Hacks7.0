import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Task = ({ task, points, onComplete, onDelete, isCompleted }) => {
  return (
    <View className="bg-white p-4 rounded-lg flex-row items-center justify-between mb-5">
      <View className="flex-row items-center flex-wrap">
        {/* Checkbox */}
        <TouchableOpacity onPress={onComplete} className="mr-4">
          <View
            className={`w-6 h-6 rounded-full border-2 border-[#55BCF6] items-center justify-center ${
              isCompleted ? "bg-[#55BCF6]" : "bg-white"
            }`}
          >
            {isCompleted && <Text className="text-white font-bold">✔</Text>}
          </View>
        </TouchableOpacity>

        {/* Task Text */}
        <Text
          className={`max-w-[70%] text-xl ${
            isCompleted ? "line-through text-gray-400" : ""
          }`}
        >
          {task}
        </Text>
      </View>

      <View className="flex-row items-center">
        <Text className="text-[#55BCF6] font-semibold">{points} pts</Text>

        {/* Delete Button */}
        <TouchableOpacity onPress={onDelete}>
          <View className="w-6 h-6 bg-red-500 rounded-full justify-center items-center ml-4">
            <Text className="text-white font-bold">X</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Goals = () => {
  const [task, setTask] = useState("");
  const [points, setPoints] = useState("");
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    if (!task || !points) return; // Ensure task and points are not empty
    Keyboard.dismiss();
    const newTask = { task, points: parseInt(points, 10), isCompleted: false };
    setTaskItems([...taskItems, newTask]);
    setTask("");
    setPoints("");
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy[index].isCompleted = !itemsCopy[index].isCompleted; // Toggle completion
    setTaskItems(itemsCopy);
  };

  const deleteTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1); // Remove task at index
    setTaskItems(itemsCopy);
  };

  return (
    <SafeAreaView className="flex-1 px-4 my-6 h-full bg-primary">
      <Text className="text-2xl text-white font-semibold mb-4">Goals</Text>

      {/* Today's Tasks */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="pt-4">
          {/* This is where the tasks will go! */}
          {taskItems.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => completeTask(index)}>
              <Task
                task={item.task}
                points={item.points}
                isCompleted={item.isCompleted}
                onComplete={() => completeTask(index)}
                onDelete={() => deleteTask(index)}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Write a task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="absolute bottom-5 w-full flex-row justify-items-center"
      >
        <TextInput
          className="py-4 px-4 my-4 bg-white w-9/12 rounded-md text-lg"
          placeholder={"Write a task"}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TextInput
          className="py-4 px-4 my-4 bg-white rounded-md w-2/12 mx-1 text-lg"
          placeholder={"Points"}
          placeholderTextColor="#04c0fb"
          value={points}
          keyboardType="numeric"
          onChangeText={(text) => setPoints(text)}
        />
        <TouchableOpacity onPress={handleAddTask}>
          <View className="w-16 h-16 my-4 bg-secondary rounded-md justify-center items-center">
            <Text className="text-5xl mt-2 text-white text-center">+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Goals;
