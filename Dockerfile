FROM node:boron

# Create app directory
#RUN mkdir -p /usr/src/app
#ADD . /path/inside/docker/container
#WORKDIR /usr/src/app
VOLUME /usr/src/app

# Bundle app source
#COPY . /usr/src/app
#RUN npm install

RUN apt-get update && apt-get install -y openssh-server  supervisor
RUN mkdir -p /var/run/sshd /var/log/supervisor
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN echo '#!/bin/bash\ncd /usr/src/app && npm run dev' > /usr/bin/start
RUN chmod +x /usr/bin/start

EXPOSE 22 3000 

CMD ["/usr/bin/supervisord"]
#CMD [ "npm", "run", "dev" ]



