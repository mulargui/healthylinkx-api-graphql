
rem cleanup resources
kubectl delete services healthylinkx-api-service
kubectl delete deployments healthylinkx-api-deployment

rem cleanup the container image
minikube ssh "/home/docker/healthylinkx-api-graphql/docker/container.sh CLEANUP"

rem remove link
minikube ssh "rm /home/docker/healthylinkx-api-graphql"

exit /B 0
