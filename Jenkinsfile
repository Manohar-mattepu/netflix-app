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
        git branch: 'main', url: 'https://github.com/Manohar-mattepu/netflix-app.git'
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
    stage('Deploy to K8s') {
      steps {
        withCredentials([file(credentialsId: "${KUBE_CONFIG_CREDENTIALS}", variable: 'KUBECONF')]) {
          sh 'mkdir -p $HOME/.kube'
          sh 'cp $KUBECONF $HOME/.kube/config'
          sh "kubectl set image deployment/netflix netflix=${REGISTRY}/${APP}:${IMAGE_TAG} -n production --record"
        }
      }
    }
  }
}
