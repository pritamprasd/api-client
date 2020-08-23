# api-client
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fpritamprasd%2Fapi-client%2Fbadge%3Fref%3Dmaster&style=flat)](https://actions-badge.atrox.dev/pritamprasd/api-client/goto?ref=master)


Meant for a learning experience for react-js/js/ts front end frameworks and spring-security based backend framework.

### How to use:
1. browse to [./api-requests-handler/api-client](./api-requests-handler/api-client) and run the maven spring-boot app by:
```sh
mvn clean package
java -jar target\api-client-0.0.1-SNAPSHOT.jar  //update version to latest
```

2. browse to [./api-client-ui](./api-client-ui) and start the in-dev npm server with:
```sh
npm run start
```

3. visit: http://localhost:3000/ . the red/green icon on top shows health of api-executor service(Step 1)

4. to view some json data & also to get updated on custom features you may run test-server by browing to [./test-server](./test-server) and running same maven commands:
```sh
mvn clean package
java -jar target\test-server-0.0.1-SNAPSHOT.jar  //update version to latest
```
This basically starts up a test server at port 9919. 
Current version only contain a `/data` endpoint for some dummy data.
