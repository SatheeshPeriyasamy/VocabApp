import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { PinnedWordsContext } from "../context/PinnedWordsContext";

export default function PinnedScreen() {
  const { pinnedWords, togglePinWord } = useContext(PinnedWordsContext);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setRefresh((prev) => !prev);
  }, [pinnedWords]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pinned Words</Text>

      {(!pinnedWords || pinnedWords.length === 0) ? (
        <Text style={styles.emptyText}>No pinned words yet.</Text>
      ) : (
        <ScrollView style={styles.scrollContainer}>
          {pinnedWords.map((word, index) => (
            <View key={index} style={styles.wordContainer}>
              <Text style={styles.word}>{word.word}</Text>

              {word.phonetics && word.phonetics.length > 0 && (
                <Text style={styles.phonetics}>{word.phonetics[0].text}</Text>
              )}

              {word.meanings && word.meanings.length > 0 && (
                <ScrollView style={styles.meaningScroll} nestedScrollEnabled={true}>
                  {word.meanings.map((meaning, idx) => (
                    <View key={idx} style={styles.meaningContainer}>
                      <Text style={styles.partOfSpeech}>{meaning.partOfSpeech}</Text>
                      {meaning.definitions.map((def, i) => (
                        <Text key={i} style={styles.definition}>• {def.definition}</Text>
                      ))}
                    </View>
                  ))}
                </ScrollView>
              )}

              <TouchableOpacity
                onPress={() => togglePinWord(word)}
                style={[styles.pinButton, { backgroundColor: "red" }]}
              >
                <Text style={styles.pinButtonText}>Unpin</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 15 },
  emptyText: { textAlign: "center", fontSize: 16, color: "gray", marginTop: 20 },
  scrollContainer: { flexGrow: 1 },
  wordContainer: { padding: 15, marginBottom: 10, backgroundColor: "#f5f5f5", borderRadius: 8 },
  word: { fontSize: 20, fontWeight: "bold" },
  phonetics: { fontSize: 16, color: "gray", marginBottom: 5 },
  meaningScroll: { maxHeight: 150 },  // ✅ LIMIT SCROLL HEIGHT
  meaningContainer: { marginTop: 5 },
  partOfSpeech: { fontSize: 18, fontWeight: "bold", color: "#007bff", textDecorationLine: "underline" },
  definition: { fontSize: 16, marginVertical: 2 },
  pinButton: { marginTop: 10, padding: 8, borderRadius: 5 },
  pinButtonText: { color: "white", textAlign: "center", fontWeight: "bold" },
});


