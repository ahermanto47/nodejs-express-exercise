FROM node

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ADD package.json /usr/src/app/package.json
COPY api/* /usr/src/app/

RUN npm install --production
ADD app.js /usr/src/app/app.js

ENTRYPOINT ["node", "app.js"]
