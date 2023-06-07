def COMMIT_HASH = ''

pipeline {
    agent any

    environment {
        IMAGE_VERSION = '1.0'
        DOCKERHUB_CREDS = 'dockerhub_creds'
        DOCKER_IMAGE = 'lmoisei/access-management'
        DOCKER_REGISTRY_URL = 'https://index.docker.io/v1/'
    }

    stages {
stage('Checkout') {
    steps {
        script {
            if (fileExists('upskilling-access-management-service/.git')) {
                dir('upskilling-access-management-service') {
                    sh('git pull')
                    COMMIT_HASH = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
                    echo "COMMIT_HASH is: ${COMMIT_HASH}" // Print the commit hash
                }
            } else {
                sh('git clone https://github.com/MoiseiLiviu/upskilling-access-management-service.git')
                dir('upskilling-access-management-service') {
                    sh('git checkout main')
                    COMMIT_HASH = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
                    echo "COMMIT_HASH is: ${COMMIT_HASH}" // Print the commit hash
                }
            }
        }
    }
}


        stage('Build Nest.js Project') {
            steps {
                dir('upskilling-access-management-service') {
                    sh('npm install')
                    sh('npm run build')
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dir('upskilling-access-management-service') {
                        docker.build("${DOCKER_IMAGE}:${COMMIT_HASH}")
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry(DOCKER_REGISTRY_URL, DOCKERHUB_CREDS) {
                        docker.image("${DOCKER_IMAGE}:${COMMIT_HASH}").push()
                    }
                }
            }
        }

stage('Update Kubernetes Deployment') {
    steps {
        script {
            withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                // Set the new image in the deployment
                sh("kubectl set image deployment/access-management access-management=${DOCKER_IMAGE}:${COMMIT_HASH} --record")
                // Rollout status can be used to ensure the deployment update is successful
                sh("kubectl rollout status deployment/access-management")
            }
        }
    }
}

    }
}