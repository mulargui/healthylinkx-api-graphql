FROM ubuntu:18.04

# Install node.js, and supplementary programs
RUN DEBIAN_FRONTEND=noninteractive apt-get -q update \
	&& apt-get -y -q install \
		nodejs \
		npm 
RUN DEBIAN_FRONTEND=noninteractive npm install -g npm@latest
RUN DEBIAN_FRONTEND=noninteractive npm install -g \
	promise-mysql \
	apollo-server \
	graphql \
	nodemon \
	graphql-iso-date \
	request \
	request-promise-native

ENV NODE_PATH /usr/local/lib/node_modules
 
EXPOSE 4000

# By default, simply start the app
CMD nodemon --legacy-watch /myapp/index.js
