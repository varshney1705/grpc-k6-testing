pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/your-repo/grpc-k6-testing.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                sudo apt update
                sudo apt install -y k6
                npm install
                '''
            }
        }

        stage('Start gRPC Server') {
            steps {
                sh 'nohup node server.js &'
            }
        }

        stage('Run k6 Performance Test') {
            steps {
                sh 'k6 run checkout_service.js'
            }
        }

        stage('Publish Performance Results') {
            steps {
                publishHTML(target: [
                    reportName: 'k6 Test Report',
                    reportDir: 'reports',
                    reportFiles: 'index.html',
                    keepAll: true
                ])
            }
        }
    }
}
