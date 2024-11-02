
# Deploying a Backend Application to Google Cloud with GKE and Artifact Registry

This guide outlines the steps to deploy a Dockerized backend application to Google Kubernetes Engine (GKE) with Docker images stored in Google Artifact Registry.

## Prerequisites

1. **Google Cloud Project** with billing enabled.
2. **Google Cloud SDK** installed and configured.
3. **Docker** installed and configured to use Google Cloud Artifact Registry.

## Steps

### 1. Set Up Google Cloud and GKE

1. **Create a Google Kubernetes Engine Cluster**:

   ```bash
   gcloud container clusters create listok-cluster --region=europe-west1 --enable-autopilot
   ```

2. **Get Cluster Credentials** to configure `kubectl`:

   ```bash
   gcloud container clusters get-credentials listok-cluster --region=europe-west1
   ```

3. **Verify Cluster Connection**:

   ```bash
   kubectl get nodes
   ```

### 2. Configure Docker for Artifact Registry

1. **Authenticate Docker with Google Cloud**:

   ```bash
   gcloud auth configure-docker europe-west2-docker.pkg.dev
   ```

2. **Build the Docker Image** (from the directory with your `Dockerfile`):

   ```bash
   docker build -t europe-west2-docker.pkg.dev/<PROJECT_ID>/<REPO_NAME>/backend:latest .
   ```

3. **Push the Image to Artifact Registry**:

   ```bash
   docker push europe-west2-docker.pkg.dev/<PROJECT_ID>/<REPO_NAME>/backend:latest
   ```

### 3. Deploy to GKE

1. **Create Kubernetes Manifests**:
   - Write `deployment.yaml` and `service.yaml` files for your application.
   - Ensure the `image` in `deployment.yaml` matches the Artifact Registry path.

2. **Apply the Configurations**:

   ```bash
   kubectl apply -f env-configmap.yaml
   kubectl apply -f mongo-deployment.yaml
   kubectl apply -f mongo-service.yaml
   kubectl apply -f listok-server-deployment.yaml
   kubectl apply -f listok_server-service.yaml
   ```

3. **Verify the Deployment**:

   ```bash
   kubectl get pods
   kubectl get services
   ```

### 4. Retrieve External IP for Backend Access

Once the `listok-server` service has a **LoadBalancer** type, an external IP will be assigned:

```bash
kubectl get services --watch
```

Use this IP and the service’s exposed port in your frontend application.

---

## Final Notes

- **Cleanup** when finished to avoid charges:

  ```bash
  kubectl delete -f <manifest-file>.yaml
  gcloud container clusters delete listok-cluster --region=europe-west1
  ```
