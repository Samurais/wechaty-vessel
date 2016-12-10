#! /bin/bash 
###########################################
# Start Docker Container
###########################################

# constants
baseDir=$(cd `dirname "$0"`;pwd)
rootDir=$(cd $baseDir/..;pwd)
# WECHATY_LOG: silly|verbose|info|warn|error|silent
WECHATY_LOG='info'

# functions
function printUsage(){
    echo "Usage:"
    echo "$0 -d # This would run the docker in detached mode."
    echo "$0 -t # This would run the docker in not-attached mode."
}

function main() {
  cd $rootDir
  docker run \
    $* \
    -e PATH="$PATH:/wechaty/bin:/wechaty/node_modules/.bin" \
    -e WECHATY_LOG="$WECHATY_LOG" \
    --volume="$rootDir":/bot \
    --name=wechaty-vessel \
    samurais/wechaty-vessel:latest \
    default
}

# main
[ -z "${BASH_SOURCE[0]}" -o "${BASH_SOURCE[0]}" = "$0" ] || return
if [ "$#" -eq  "0" ]
then
    printUsage
elif [ "$*" = "-t" ]
then
    main -t -i --rm
elif [ "$*" = "-d" ]
then
    main -d
else
    printUsage
fi

