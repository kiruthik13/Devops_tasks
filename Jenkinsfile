pipeline {
    agent any

    environment {
        BACKEND_IMAGE_NAME  = "mern-studentportal-backend"
        FRONTEND_IMAGE_NAME = "mern-studentportal-frontend"
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
                    dockerImageBackend = docker.build("${DOCKER_REPO}/${BACKEND_IMAGE_NAME}:${IMAGE_TAG}", "./MERN-StudentPortal-main/backend")
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                script {
                    dockerImageFrontend = docker.build("${DOCKER_REPO}/${FRONTEND_IMAGE_NAME}:${IMAGE_TAG}", "./MERN-StudentPortal-main/frontend")
                }
            }
        }

        stage('Push Docker Images') { 
    steps { 
        script { 
            sh 'docker login -u kiruthik1304 -p "kiruthik@13"'
            dockerImageBackend.push("${IMAGE_TAG}") 
            dockerImageFrontend.push("${IMAGE_TAG}") 
        } 
    } 
}



        stage('Deploy to Minikube') { 
    steps { 
        script { 
            sh 'kubectl config set-cluster minikube --server=https://127.0.0.1:50068'
            sh 'kubectl apply -f deploy.yaml --validate=false' 
            sh 'kubectl rollout status deployment/mern-studentportal' 
        } 
    } 
}



    post {
        always {
            echo "Pipeline execution completed."
        }
    }
}
