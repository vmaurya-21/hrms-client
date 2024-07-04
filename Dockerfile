#FROM node:14-alpine 
# Add a work directory
# WORKDIR /app
# # Cache and Install dependencies
# COPY package.json .

# RUN npm install
# # Copy app files
# COPY . .

# # Start the app
# CMD [ "npm", "run", "start" ]

FROM node:14-alpine as builder
WORKDIR /app
#ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
#COPY package-lock.json ./
RUN npm i --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
