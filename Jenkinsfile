pipeline {
    agent any

    environment {
        IMAGE_NAME      = "mern-studentportal"
        IMAGE_TAG       = "latest"
        DOCKER_REGISTRY = "docker.io"
        DOCKER_REPO     = "kiruthik1304"
        DOCKER_USERNAME = "kiruthik1304"
        DOCKER_PASSWORD = "kiruthik@13"
    }

    stages {
        stage('Checkout') {
            steps {
                // Clone your repository from GitHub
                git url: 'https://github.com/kiruthik13/Devops_tasks.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    // Build the image and tag it as: docker.io/kiruthik1304/mern-studentportal:latest
                    dockerImage = docker.build("${DOCKER_REPO}/${IMAGE_NAME}:${IMAGE_TAG}")
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    // Push the image to Docker Hub using the hardcoded credentials
                    docker.withRegistry("https://${DOCKER_REGISTRY}", [ username: env.DOCKER_USERNAME, password: env.DOCKER_PASSWORD ]) {
                        dockerImage.push("${IMAGE_TAG}")
                    }
                }
            }
        }
        stage('Deploy to Minikube') {
            steps {
                // Deploy using Kubernetes YAML file; ensure deploy.yaml references the pushed image: docker.io/kiruthik1304/mern-studentportal:latest
                sh 'kubectl apply -f deploy.yaml'
                // Retrieve pods for verification
                sh 'kubectl get pods'
                // Set up port-forwarding from pod port 8080 to localhost:6700
                sh '''
                   POD_NAME=$(kubectl get pods -l app=mern-studentportal -o jsonpath="{.items[0].metadata.name}")
                   nohup kubectl port-forward $POD_NAME 6700:8080 &
                   '''
            }
        }
    }
    post {
        always {
            echo "Pipeline execution completed."
        }
    }
}
