node('slaveNode1'){
    
    try {

        stage('Download repo') {
            git credentialsId: 'github', branch: "main", url: "git@github.com:ahermanto47/nodejs-express-exercise.git"
            stash excludes: 'target/**,lib/**', name: 'source'
        }

        stage('Install, EsLint, And Test') {
            unstash 'source'
            sh "ls"
            dir('employee-app') {
                sh "pwd"
                sh 'npm install && npm run lint && npm test'
            }
        }

        stage('Build And Push Image') {
            unstash 'source'
            sh "ls"
            dir('employee-app') {
                sh "pwd"
                sh 'podman build -t localhost:5000/employee-app:0.0.3 .'
                sh 'podman push localhost:5000/employee-app:0.0.3'
            }
        }

        stage('Deploy Mongo') {
            unstash 'source'
            sh "ls"
            sh 'kubectl apply -f mongodb/mongodb.yaml'
            timeout(time: 5, unit: 'MINUTES') {  
                sh 'kubectl wait deploy/mongo --for condition=available --timeout=300s'
            }
        }
        
        stage('Deploy employee-app') {
            unstash 'source'
            sh "ls"
            sh 'kubectl apply -f employee-app/Deployment.yaml'
            timeout(time: 5, unit: 'MINUTES') {  
                sh 'kubectl wait deploy/employee-app --for condition=available --timeout=300s'
            }
        }
        
        stage('Integration Test') {
            script {
                SVC_HOST = sh(script: 'kubectl config view -o jsonpath={.clusters[0].cluster.server} >> tmp && awk -F: \'{print $2}\' tmp && rm tmp',returnStdout: true).trim()
                SVC_PORT = sh(script: 'kubectl get svc employee-svc -o jsonpath={.spec.ports[0].nodePort}',returnStdout: true).trim()   
                SVC_URL = "http:"+SVC_HOST+":"+SVC_PORT+"/Employees"
                //env.TEST_URL = SVC_URL
                //sh 'echo ${TEST_URL}'
                SVC_RESPONSE = sh(script: 'curl '+SVC_URL,returnStdout: true).trim()
                echo SVC_RESPONSE
                jsonString = '\\{\\"id\\":\\3,\\"name\\"\\:\\"Rob\\"\\}'
                SVC_RESPONSE = sh(script: 'curl -X POST -H "Content-type: application/json" -d '+jsonString+' '+SVC_URL,returnStdout: true).trim()
                echo SVC_RESPONSE
                SVC_RESPONSE = sh(script: 'curl '+SVC_URL,returnStdout: true).trim()
                echo SVC_RESPONSE
                SVC_RESPONSE = sh(script: 'curl -X DELETE '+SVC_URL+ '/delete/3',returnStdout: true).trim()
                echo SVC_RESPONSE
                SVC_RESPONSE = sh(script: 'curl '+SVC_URL,returnStdout: true).trim()
                echo SVC_RESPONSE
            }
        }

    } catch (e) {

        throw e

    } finally {

        stage('Cleanup') {
            unstash 'source'
            sh "ls"
            sh 'kubectl delete -f employee-app/Deployment.yaml'
            sh 'kubectl delete -f mongodb/mongodb.yaml'
        }

    }
    
}
