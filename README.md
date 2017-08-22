# Uniplaces Mobile Challenge

## About
An app built with React Native for an iOS React Native mobile challenge. The app runs on iOS devices (and theoretically on Android devices, however not tested as it was not a part of the test, but built with components that are cross-platform). 

## Screens (what to build)
I was provided with these 5 screens in png form. No assets were provided, dimensions, colour values, shadow values or linear gradient values. Additionally, as the occasional blue lines in the screens didn't make any sense to me, i.e. didn't serve any purpose in the app, I assumed they were accidental.

![artboard](https://user-images.githubusercontent.com/6841437/29561304-4a5701da-8735-11e7-8886-2700fb571f14.png)
  
## Requirements (and my assumptions about them)
- By default move in should always be greater than today
   * *Here I assumed that the minimum date for booking should initially be initialised as tomorrow.*
- By default don't allow to input a move out before or equal to the move in
- Ability to change the minimum selectable move in date
   * *Here I assumed this meant I should use the response from the backend instead of a hardcoded value.*
- Ability to change the minimum duration (i.e: difference between move in and move out date should be greater than X days)
   * *Here I assumed the same as in the requirement above.*
- The UI feedback should be equal
   * *I was unsure what this meant, but I assumed that users should see errors when inputting invalid date ranges.*
- The design doesn't need to be exactly the same but similar
- If date range selected has a blocked period included the user should see an error (don't worry with the UI on this, it can be an alert)
- GET from a dummy backend a JSON with the calendar configuration
- POST the move in and move out to a dummy backend

## Prerequisites for running the app
  1. [Git](https://git-scm.com/downloads) 
  2. [Node.js](https://nodejs.org/)
  3. (Optional) [Expo app](https://expo.io) to view the app on your phone
  4. (Optional) [Xcode](https://itunes.apple.com/en/app/xcode/id497799835?mt=12#) for running the app on an iOS simulator on a Mac

## Running the app 
1. Open Terminal/Command prompt
2. Navigate to the uniplaces-challenge project directory
3. Run `$ npm install`
4. You now have two options of viewing/running the app:
   1. **Expo**: Run `$ npm start` and follow the instructions that appear in the Terminal/Command prompt
   2. **iOS simulator**: Run `$ npm run ios`
5. 🎉🎉🎉 (If not: [Troubleshooting](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md#troubleshooting))
