pipeline {
    agent any

    environment {
        IMAGE_NAME      = "mern-studentportal"
        IMAGE_TAG       = "latest"
        DOCKER_REGISTRY = "docker.io"
        DOCKER_REPO     = "kiruthik1304"
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    // Ensure the correct branch is checked out
                    git branch: 'main', url: 'https://github.com/kiruthik13/Devops_tasks.git'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${DOCKER_REPO}/${IMAGE_NAME}:${IMAGE_TAG}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        docker.withRegistry("https://${DOCKER_REGISTRY}", "${DOCKER_USERNAME}:${DOCKER_PASSWORD}") {
                            dockerImage.push("${IMAGE_TAG}")
                        }
                    }
                }
            }
        }

        stage('Deploy to Minikube') {
            steps {
                script {
                    // Apply Kubernetes deployment
                    sh 'kubectl apply -f deploy.yaml'

                    // Wait for pod to be ready
                    sh 'kubectl rollout status deployment/mern-studentportal'

                    // Retrieve and port-forward pod
                    sh '''
                    POD_NAME=$(kubectl get pods -l app=mern-studentportal -o jsonpath="{.items[0].metadata.name}")
                    nohup kubectl port-forward $POD_NAME 6700:8080 &
                    '''
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline execution completed."
        }
    }
}
