# Netflix App Demo (Kubernetes + NodePort)

This repo contains a simple Node.js Netflix clone app deployed into Kubernetes using NodePort.

## Steps

1. Clone repo:
   ```bash
   git clone https://github.com/<your-username>/netflix-app.git
   cd netflix-app
   ```

2. Build & push Docker image:
   ```bash
   docker build -t docker.io/<your-dockerhub-username>/netflix-app:latest .
   docker push docker.io/<your-dockerhub-username>/netflix-app:latest
   ```

3. Deploy to Kubernetes:
   ```bash
   kubectl apply -f k8s/
   ```

4. Access app via NodePort:
   ```
   http://<node-ip>:30080
   ```
