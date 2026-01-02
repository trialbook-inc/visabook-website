FROM nginx:alpine

# Clean the default directory
RUN rm -rf /usr/share/nginx/html/*

# Copy your Webstudio export files
COPY . /usr/share/nginx/html

# IMPORTANT: Copy your custom config to the correct location
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4000

CMD ["nginx", "-g", "daemon off;"]