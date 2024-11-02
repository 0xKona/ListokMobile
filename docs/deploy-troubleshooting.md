
# Troubleshooting Google Cloud Backend Deployment Issues

This document lists common issues encountered during deployment to Google Cloud's GKE and Artifact Registry, along with solutions.

---

## Common Issues and Fixes

### 1. `ImagePullBackOff` and `ErrImagePull`

#### Symptoms
- Pods show `ImagePullBackOff` or `ErrImagePull`.

#### Solutions
1. **Incorrect Image Path**:
   - Ensure the image path in the Kubernetes deployment matches the Artifact Registry path.

2. **Insufficient Permissions**:
   - Grant `artifactregistry.reader` role to the GKE service account:
   
     ```bash
     gcloud projects add-iam-policy-binding <PROJECT_ID>        --member="serviceAccount:<SERVICE_ACCOUNT_EMAIL>"        --role="roles/artifactregistry.reader"
     ```

3. **Reapply Deployment**:
   - Delete and reapply pods to force the image to pull again:

     ```bash
     kubectl delete pod -l <label-selector>
     ```

---

### 2. `CrashLoopBackOff`

#### Symptoms
- Pods keep restarting with `CrashLoopBackOff`.

#### Solutions
1. **Check Logs**:
   - View pod logs for error details:

     ```bash
     kubectl logs <pod-name>
     ```

2. **Verify Environment Variables**:
   - Ensure required environment variables are set in the `ConfigMap` and referenced correctly.

3. **Architecture Mismatch**:
   - Rebuild Docker image for `linux/amd64` if needed:

     ```bash
     docker buildx build --platform linux/amd64 -t <IMAGE_PATH>:latest .
     docker push <IMAGE_PATH>:latest
     ```

---

### 3. Cannot Access Backend from Simulator/Emulator

#### Symptoms
- Frontend running in an emulator/simulator cannot connect to backend.

#### Solutions
1. **Use Proxy for Local Testing**:
   - Set up `ngrok` to tunnel requests from `localhost` to the external IP.

     ```bash
     ngrok http <EXTERNAL_IP>:3000
     ```

2. **Correct Emulator Network Settings**:
   - **iOS Simulator**: Use `localhost` or `127.0.0.1`.
   - **Android Emulator**: Use `10.0.2.2` to access local services.

3. **Check Cloud Firewall Rules**:
   - Ensure firewall rules allow traffic to the backend service on the necessary port.

---

### 4. `exec format error` in Logs

#### Symptoms
- Log shows `exec format error`.

#### Solution
- This error indicates an architecture mismatch. Rebuild the Docker image with `linux/amd64` as the target platform.

---

### 5. `ENOTFOUND` Error in Postman

#### Symptoms
- Postman cannot resolve the backend’s IP address.

#### Solution
1. **Verify External IP Access**:
   - Ensure the external IP is accessible in a browser.
   
2. **Clear DNS Cache or Proxy Settings in Postman**:
   - Disable system proxy in Postman settings and restart.

---

## Final Troubleshooting Commands

- **Describe Pod Events**:
  ```bash
  kubectl describe pod <pod-name>
  ```

- **View ConfigMap**:
  ```bash
  kubectl get configmap <configmap-name> -o yaml
  ```

This document should help diagnose and resolve most issues encountered during backend deployment on Google Cloud.
