pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh'''
                    echo "Building docker image..."
                    docker build -t products-back:v1 .
                    docker tag products-back:v1 transformation2/snt-jenkins-products-back:v$BUILD_NUMBER
                '''
            }
        }
        stage('Push') {
            steps {
                sh'''
                    echo "Pushing docker image into Dockerhub..."
                    docker push transformation2/snt-jenkins-products-back:v$BUILD_NUMBER 
                '''
            }
        }

}
}
