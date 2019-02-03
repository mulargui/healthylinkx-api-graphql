#!/usr/bin/env bash

#
# NOTE: There is a dependency to MySQLDB container to link MySQL.
#

set +x
export DEBIAN_FRONTEND=noninteractive
# Absolute path to this repo
SCRIPT=$(readlink -f "$0")
export REPOPATH=$(dirname "$SCRIPT")/..

# what you can do
CLEANUP=N
BUILD=N

# you can also set the flags using the command line
for var in "$@"
do
	if [ "CLEANUP" == "$var" ]; then CLEANUP=Y 
	fi
	if [ "BUILD" == "$var" ]; then BUILD=Y 
	fi
done

# clean up all images
if [ "${CLEANUP}" == "Y" ]; then
	sudo docker rmi -f nodejs
fi

# create image
if [ "${BUILD}" == "Y" ]; then
	sudo docker build --rm=true -t nodejs $REPOPATH/docker
fi
