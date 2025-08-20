pipeline {
  agent any
  environment {
    REGISTRY = "docker.io/manoharmattepu"
    APP = "netflix-app"
    IMAGE_TAG = "${env.BUILD_NUMBER}"
    KUBE_CONFIG_CREDENTIALS = "kubeconfig-cred-id"
  }
  stages {
    stage('Checkout') {
      steps { 
        git branch: 'master', url: 'https://github.com/Manohar-mattepu/netflix-app.git'
      }
    }
    stage('Build Image') {
      steps {
        sh "docker build -t ${REGISTRY}/${APP}:${IMAGE_TAG} ."
      }
    }
    stage('Push Image') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
          sh "echo $PASS | docker login -u $USER --password-stdin"
          sh "docker push ${REGISTRY}/${APP}:${IMAGE_TAG}"
        }
      }
    }
    stage('Deploy to Kubernetes') {
            steps {
                // Inject kubeconfig file stored in Jenkins credentials
                withCredentials([file(credentialsId: 'kubeconfig-cred-id', variable: 'KUBECONFIG')]) {
                    sh "kubectl apply -f k8s-deployment.yaml"
                    sh "kubectl apply -f k8s-service.yaml"
                }
            }
        }
    }
}
