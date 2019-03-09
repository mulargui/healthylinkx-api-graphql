
kubectl scale deployment healthylinkx-api-deployment --replicas 0

rem create the containers
minikube ssh "/home/docker/healthylinkx-api-graphql/docker/container.sh BUILD"

kubectl scale deployment healthylinkx-api-deployment --replicas 1

exit /B 0

