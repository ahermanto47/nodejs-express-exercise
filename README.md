# nodejs-express-exercise

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

## Deploy to minikube

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

```
curl $(minikube service employee-svc --url)/Employees | jq
```


