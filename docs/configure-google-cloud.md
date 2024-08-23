# Configure Google Cloud

## 1. Setting Up Google OAuth for Login

### Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Click the project dropdown at the top left and select **New Project**.
3. Name your project (e.g., `Listok Project`) and click **Create**.

### Step 2: Enable APIs and Create Credentials

1. In the Google Cloud Console, go to **APIs & Services > Library**.
2. Enable the following APIs:
   - **Google Drive API**
   - **Google OAuth2.0 API**
3. Go to **APIs & Services > Credentials**.
4. Click **Create Credentials** and select **OAuth 2.0 Client IDs**.
5. Configure the consent screen and add the required OAuth scopes.
6. Create the OAuth 2.0 Client IDs for each platform (Web, iOS, Android).
7. Download the credentials as JSON for the web client and note down the Client IDs for all platforms.

### Step 3: Add OAuth Credentials to `.env`

1. Update your `.env` file with the following:
    ```env
    GOOGLE_CLIENT_ID=Your-Web-Client-ID
    IOS_CLIENT_ID=Your-iOS-Client-ID
    ANDROID_CLIENT_ID=Your-Android-Client-ID
    WEB_CLIENT_ID=Your-Web-Client-ID
    GOOGLE_OAUTH_CLIENT_SECRET=Your-Google-OAuth-Secret
    ```

## 2. Setting Up Google Cloud Storage for Images

### Step 1: Create a Storage Bucket

1. In the Google Cloud Console, go to **Cloud Storage > Browser**.
2. Click **Create Bucket**.
3. Name your bucket (e.g., `listok-images`).
4. Choose the appropriate settings and create the bucket.

### Step 2: Set Up Service Account and Credentials

1. Go to **IAM & Admin > Service Accounts**.
2. Create a new service account with the role **Storage Admin**.
3. Create a key for the service account and download it as a JSON file.
4. Save this JSON file in the `config` folder of your project as `listok-image-storage-config.json`.

### Step 3: Update `google-cloud-config.js`

1. Ensure your `google-cloud-config.js` file points to the correct JSON file and bucket:
    ```javascript
    import { Storage } from "@google-cloud/storage";

    const storage = new Storage({
      keyFilename: './config/listok-image-storage-config.json',
      projectId: 'your-google-cloud-project-id',
    });

    const bucketName = 'listok-images';
    const bucket = storage.bucket(bucketName);

    export default bucket;
    ```
