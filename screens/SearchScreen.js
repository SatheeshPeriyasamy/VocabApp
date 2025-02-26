import React, { useState, useContext } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet 
} from "react-native";
import * as Speech from "expo-speech";
import { PinnedWordsContext } from "../context/PinnedWordsContext";

export default function SearchScreen() {
  const [searchText, setSearchText] = useState("");
  const [wordData, setWordData] = useState(null);
  const [error, setError] = useState("");
  const { pinnedWords, togglePinWord } = useContext(PinnedWordsContext);

  const fetchWord = async () => {
    if (!searchText.trim()) return;
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchText}`);
      const data = await response.json();

      if (Array.isArray(data)) {
        setWordData(data[0]); // Take the first result
        setError("");
      } else {
        setError("Word not found. Try another word.");
        setWordData(null);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching word. Try again later.");
    }
  };

  const playPronunciation = () => {
    if (wordData?.phonetics?.length > 0) {
      const audio = wordData.phonetics.find((p) => p.audio);
      if (audio) {
        Speech.speak(wordData.word);
      }
    }
  };

  const isPinned = pinnedWords.some((w) => w.word === wordData?.word);

  return (
    <View style={styles.container}>
        
      <TextInput
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search a word..."
        style={styles.input}
      />
      <TouchableOpacity onPress={fetchWord} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {wordData && (
        <ScrollView style={styles.scrollContainer}>
          <Text style={styles.word}>{wordData.word}</Text>

          {wordData.phonetics.length > 0 && <Text style={styles.phonetics}>{wordData.phonetics[0].text}</Text>}

          <TouchableOpacity onPress={playPronunciation} style={styles.playButton}>
            <Text style={styles.playButtonText}>🔊 Play Pronunciation</Text>
          </TouchableOpacity>

          {wordData.meanings.map((meaning, index) => (
            <View key={index} style={styles.meaningContainer}>
              <Text style={styles.partOfSpeech}>{meaning.partOfSpeech}</Text>
              {meaning.definitions.map((def, i) => (
                <Text key={i} style={styles.definition}>• {def.definition}</Text>
              ))}
            </View>
          ))}

          <TouchableOpacity
            onPress={() => togglePinWord(wordData)}
            style={[styles.pinButton, { backgroundColor: isPinned ? "red" : "blue" }]}
          >
            <Text style={styles.pinButtonText}>{isPinned ? "Unpin Word" : "Pin Word"}</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  searchButton: { backgroundColor: "blue", padding: 10, marginBottom: 10 },
  searchButtonText: { color: "white", textAlign: "center" },
  errorText: { color: "red", marginTop: 10 },
  scrollContainer: { flexGrow: 1, marginTop: 10 },
  word: { fontSize: 24, fontWeight: "bold" },
  phonetics: { fontSize: 16, color: "gray", marginBottom: 5 },
  playButton: { marginVertical: 10 },
  playButtonText: { color: "blue", fontSize: 16 },
  meaningContainer: { marginTop: 10 },
  partOfSpeech: { fontSize: 18, fontWeight: "bold", color: "tomato", textDecorationLine: "underline" },
  definition: { fontSize: 16, marginVertical: 2 },
  pinButton: { padding: 12, marginTop: 20, borderRadius: 5, alignItems: "center" },
  pinButtonText: { color: "white", fontSize: 16 },
});


