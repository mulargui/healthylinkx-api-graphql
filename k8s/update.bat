
kubectl scale deployment healthylinkx-api-deployment --replicas 0

rem wait till everything is down
timeout 45

kubectl scale deployment healthylinkx-api-deployment --replicas 1

exit /B 0

