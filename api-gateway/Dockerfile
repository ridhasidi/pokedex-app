# based image yang akan digunakan
FROM node:16.13

# path di container
WORKDIR /api-gateway/

#set ENV
ENV ENDPOINT=redis-14101.c8.us-east-1-3.ec2.cloud.redislabs.com
ENV PASSWORD=naee3YezBiUM5zHDQ61mAGSRFkGijCvM

# copy dependencies
COPY package.json  package-lock.json /api-gateway/

# install npm dan hapus cache
RUN npm install && npm cache clean --force

# install development
RUN npm install -g nodemon

# copy semua file and folder
COPY ./ ./

# execute apps: production
CMD ["npm", "run", "start"]