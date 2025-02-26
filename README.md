# VocabApp

VocabApp is a vocabulary-building application that allows users to search for words, get detailed meanings, and pin words for future reference. It provides pronunciation support and ensures that pinned words persist even after the app is restarted.

## Features

- Search for words and get detailed definitions, phonetics, and word types (noun, verb, etc.).
- Listen to word pronunciations using text-to-speech.
- Pin and unpin words, with visual indicators for pinned status.
- Persistent pinned words using AsyncStorage.
- Smooth scrolling for long descriptions.
- Modern UI with an improved text input and search functionality.

## Installation & Setup

### Prerequisites

Ensure the following are installed:

- Node.js (v16 or later)
- Expo CLI (`npm install -g expo-cli`)
- Android Studio / Emulator or a physical Android device

### Clone the Repository

```sh
git clone https://github.com/SatheeshPeriyasamy/VocabApp.git
cd VocabApp
```

### Install Dependencies
```sh
npm install
```

### Run the Application
```sh
npx expo start
```

- For Android: Press a to launch the emulator or scan the QR code using Expo Go.
- For iOS (Mac users): Press i to open in the iOS Simulator.

## Building the App (Android AAB/APK)
### Build the .AAB File
```sh
eas build --platform android
```
- If EAS CLI is not installed, install it with:
```sh
npm install -g eas-cli
```
- After the build completes, download the .aab file.
  
### Convert AAB to APK (Using Bundletool)
- Download Bundletool from internet.
- Run the following command to generate an APK:
```sh
java -jar bundletool.jar build-apks --bundle="application.aab" --output="output.apks" --mode=universal
```

- Extract the APK from the .apks file:
```sh
unzip output.apks -d apk_output
```
- Install the APK on your device:
```sh
adb install apk_output/universal.apk
```

## API Used
VocabApp uses the Free Dictionary API to fetch word meanings and details.

## Technologies Used
- React Native (Expo)
- React Navigation
- AsyncStorage (For persisting pinned words)
- Expo Speech (For pronunciation)
- Axios (For API calls)
  
## Licensing
This app is under MIT License and anyone can fork and improve this app.

## Download the APK here
https://drive.google.com/file/d/1QubSif1eB15FEzM_EMmoOLKa5-gP0EK1/view?usp=sharing  


