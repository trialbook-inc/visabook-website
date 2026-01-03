FROM nginx:alpine

# Clean the default directory
RUN rm -rf /usr/share/nginx/html/*

# Copy all project files (including index, blogs folder, robots, and sitemap)
COPY . /usr/share/nginx/html

# Copy your custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4000

CMD ["nginx", "-g", "daemon off;"]