import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const PinnedWordsContext = createContext();

export const PinnedWordsProvider = ({ children }) => {
  const [pinnedWords, setPinnedWords] = useState([]);

  // Load pinned words from AsyncStorage
  useEffect(() => {
    const loadPinnedWords = async () => {
      try {
        const storedWords = await AsyncStorage.getItem("pinnedWords");
        if (storedWords) {
          setPinnedWords(JSON.parse(storedWords));
        }
      } catch (error) {
        console.error("Failed to load pinned words", error);
      }
    };
    loadPinnedWords();
  }, []);

  // Save pinned words when they change
  useEffect(() => {
    const savePinnedWords = async () => {
      try {
        await AsyncStorage.setItem("pinnedWords", JSON.stringify(pinnedWords));
      } catch (error) {
        console.error("Failed to save pinned words", error);
      }
    };
    savePinnedWords();
  }, [pinnedWords]);

  const togglePinWord = (word) => {
    setPinnedWords((prev) => {
      const updatedList = prev.some((w) => w.word === word.word)
        ? prev.filter((w) => w.word !== word.word) // Unpin word
        : [...prev, word]; // Pin word

      AsyncStorage.setItem("pinnedWords", JSON.stringify(updatedList)); // Ensure it saves
      return updatedList;
    });
  };

  return (
    <PinnedWordsContext.Provider value={{ pinnedWords, togglePinWord }}>
      {children}
    </PinnedWordsContext.Provider>
  );
};

