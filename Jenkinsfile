pipeline {
    agent any

    environment {
        IMAGE_NAME_BACKEND  = "mern-studentportal-backend"
        IMAGE_NAME_FRONTEND = "mern-studentportal-frontend"
        IMAGE_TAG           = "latest"
        DOCKER_REGISTRY     = "docker.io"
        DOCKER_REPO         = "kiruthik1304"
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    git branch: 'main', url: 'https://github.com/kiruthik13/Devops_tasks.git'
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                script {
                    dockerImageBackend = docker.build("${DOCKER_REPO}/${IMAGE_NAME_BACKEND}:${IMAGE_TAG}", "./backend")
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    dockerImageFrontend = docker.build("${DOCKER_REPO}/${IMAGE_NAME_FRONTEND}:${IMAGE_TAG}", "./frontend")
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        docker.withRegistry("https://${DOCKER_REGISTRY}", "${DOCKER_USERNAME}:${DOCKER_PASSWORD}") {
                            dockerImageBackend.push("${IMAGE_TAG}")
                            dockerImageFrontend.push("${IMAGE_TAG}")
                        }
                    }
                }
            }
        }

        stage('Deploy to Minikube') {
            steps {
                script {
                    sh 'kubectl apply -f deploy.yaml'
                    sh 'kubectl rollout status deployment/mern-studentportal-backend'
                    sh 'kubectl rollout status deployment/mern-studentportal-frontend'
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
