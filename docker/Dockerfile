FROM ubuntu:18.04

RUN DEBIAN_FRONTEND=noninteractive 

# Install node.js, and supplementary programs
RUN apt-get -q update && apt-get -y -q install nodejs npm
RUN npm install -g mysql apollo-server graphql

ENV NODE_PATH /usr/local/lib/node_modules
 
EXPOSE 4000

# By default, simply start the app
CMD node /myapp/index.js
