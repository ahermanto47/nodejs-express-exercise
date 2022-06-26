# security-svc

## Set Environment

```
echo this-is-my-secret-key | base64
```

```
export SECRET_TOKEN=dGhpcy1pcy1teS1zZWNyZXQta2V5Cg==
```

```
export ATLAS_URI=mongodb://<username>:<password>@192.168.39.207:32000
```

## Signup

```
curl -X POST -H 'Content-type: application/json' -d '{"username": "bob", "password": "secret123", "email":"bob@test.com", "roles":["USER"]}' http://localhost:4000/users/signup | jq
```

## Login

> Get the output token to use as bearer token - 'Bearer TOKEN'

```
curl -X POST -H 'Content-type: application/json' -d '{"username": "bob", "password": "secret123"}' http://localhost:4000/users/signin
```