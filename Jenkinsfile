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
                withCredentials([file(credentialsId: "${KUBE_CONFIG_CREDENTIALS}", variable: 'KUBECONFIG')]) {
                    // Apply the YAMLs
                    sh "kubectl apply -f k8s-deployment.yaml"
                    sh "kubectl apply -f k8s-service.yaml"

                    // Update deployment image dynamically with the correct IMAGE_TAG
                    sh "kubectl set image deployment/netflix-app-deployment netflix-app=${REGISTRY}/${APP}:${IMAGE_TAG}"
                    
                    // Wait until rollout completes
                    sh "kubectl rollout status deployment/netflix-app-deployment"
                }
            }
        }
    }

    post {
        always {
            sh "docker logout || true"
        }
        success {
            echo "Pipeline completed successfully! Image deployed to Kubernetes."
        }
        failure {
            echo "Pipeline failed. Check logs for errors."
        }
    }
}
