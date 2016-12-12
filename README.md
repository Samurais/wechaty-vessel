# Wechaty Vessel

## Install g
```
npm install typings gulp -g
```

## Quick Get Start
```
git clone git@github.com:Samurais/wechaty-vessel.git
cd wechaty-vessel
npm install
typings install
gulp # start the server
```

## Run in Docker
```
docker push samurais/wechaty-vessel:latest
cd wechaty-vessel
npm install
typings install
scripts/start-docker-container.sh -d
scripts/login-docker-container.sh
```

## Contribution
```
gulp watch:serve # start server and 
gulp watch:test
```

