
export const SERVICE_NAME: string = "restapi";
export const API_BASE_URL: string = "/api/v1"


//docker run --rm --network=svc-restapi_workshop busybox /bin/sh -c 'for i in `seq 1 10`; do curl -s http://localhost:8080/api/v1/notifications; done'