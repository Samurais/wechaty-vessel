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
function main() {
  cd $rootDir
  docker run \
    -t -i --rm \
    -e PATH="$PATH:/wechaty/bin:/wechaty/node_modules/.bin" \
    -e WECHATY_LOG="$WECHATY_LOG" \
    --volume="$rootDir":/bot \
    --name=wechaty-vessel \
    samurais/wechaty-vessel:latest \
    default
}

# main 
[ -z "${BASH_SOURCE[0]}" -o "${BASH_SOURCE[0]}" = "$0" ] || return
main
