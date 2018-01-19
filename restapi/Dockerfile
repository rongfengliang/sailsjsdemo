FROM dalongrong/node-yarn
RUN mkdir -p /home/nodejs/app
WORKDIR /home/nodejs/app
COPY . /home/nodejs/app
EXPOSE 1337
RUN yarn 
CMD ["yarn","run","start"]