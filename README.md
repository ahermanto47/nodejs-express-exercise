# nodejs-express-exercise

> Run a nodejs app using express library, openapi (with swagger-jsdoc), and mongodb in minikube

## Setup mongo in minikube

```
kubectl apply -f mongodb/mongodb.yaml
```

## Install express framework

```
npm install express --save
```

## Create a new express app using express-generator without view codes

```
npx express-generator --no-view --git employee-app
```

## Install and Run

```
cd employee-app
```

```
npm install
```

```
npm start
```

## Test and coverage

```
npm test
```

> See coverage result in ./coverage/lcov-report/index.html

## Note when running locally

> During coding to run integration tests, we need to set the mongo url environment. On windows set the ATLAS_URI

```
set ATLAS_URI=mongodb://<username>:<password>@192.168.1.240:32000
```

> On linux export the ATLAS_URI

```
export ATLAS_URI=mongodb://<username>:<password>@192.168.1.240:32000
```

## Deploy to minikube

> After done coding, we deploy to a minikube instance

## On separate terminal start port forwarding for pushing image to minikube

```
kubectl port-forward --namespace kube-system service/registry 5000:80
```

## Build and push the image

```
podman build -t localhost:5000/employee-app:0.0.1 .
```

```
podman push localhost:5000/employee-app:0.0.1
```

## Deploy to minikube

```
kubectl apply -f Deployment
```

## Test with curl

## List all employees

```
curl $(minikube service employee-svc --url)/Employees | jq
```

## Add one employee, Robert
```
curl -X POST -H 'Content-type: application/json' -d '{"id": 3,"name": "Robert"}' $(minikube service employee-svc --url)/Employees | jq
```
## Verify
```
curl $(minikube service employee-svc --url)/Employees | jq
```
 
## Delete one employee, Robert
```
curl -X DELETE $(minikube service employee-svc --url)/Employees/delete/3 | jq
```
## Verify
```
curl $(minikube service employee-svc --url)/Employees | jq
```
 
## Or Test with the swagger ui

<p align="center"><img src="images/AnimatedSwagger.gif" alt="Test Swagger UI Image"/></p>

