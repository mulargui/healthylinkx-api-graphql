FROM node:8.15-alpine

RUN yarn add \
	promise-mysql \
	apollo-server \
	graphql \
	graphql-iso-date \
	request \
	request-promise-native

ENV NODE_PATH /usr/local/lib/node_modules
 
EXPOSE 4000

# By default, simply start the app
CMD node /myapp/index.js
