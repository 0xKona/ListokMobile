# Getting Started - Backend

- First ensure you have the following installed:
    1. [NodeJS](https://nodejs.org/en/download/package-manager/current)
    2. [Docker Desktop](https://www.docker.com/products/docker-desktop/) or alternatively [Rancher](https://rancherdesktop.io/)

- Then cd into the backend directory
    1. Run `npm install` to install the dependencies.
    2. Create a `.env` file in the root of the backend directory
    3. Add the following to your `.env` file:
        `
        MONGO_URI=mongodb://mongo:27017/yourdatabasename
        PORT=3000
        GOOGLE_OAUTH_CLIENT_SECRET=Your-Google-Oauth-Secret
        JWT_SECRET=RandomlyGeneratedJWTSecret

        GOOGLE_CLIENT_ID=GOOGLE WEB OAUTH CLIENT ID HERE
        IOS_CLIENT_ID=GOOGLE IOS CLIENT ID HERE
        ANDROID_CLIENT_ID=GOOGLE ANDROID CLIENT ID HERE
        WEB_CLIENT_ID=GOOGLE WEB OAUTH CLIENT ID HERE
        `

    4. Add your JSON file containing the image bucket config to the config folder in the root of the project. It should be saved as:
        `listok-image-storage-config.json`

    5. If you don't know how to configure google cloud for login and images see [here](configure-google-cloud.md) or visit the official google cloud docs. 

# Getting Started - Frontend

- From the project root run `npm install`
- You'll then need a `config.json` file in the config folder that contains your server url in the following format:
    ```json
    {
        "serverURL": "http://192.168.1.139:3000" 
    }
    ```

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.