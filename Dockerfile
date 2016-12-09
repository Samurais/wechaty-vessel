FROM zixia/wechaty:latest
MAINTAINER Hai Liang Wang <hailiang.hl.wang@gmail.com>

RUN npm install gulp -g
RUN echo "PATH=$PATH:/wechaty/bin:/wechaty/node_modules/.bin" >> ~/.bashrc
WORKDIR /bot

ENTRYPOINT ["gulp"]

LABEL org.label-schema.license=ISC \
      org.label-schema.vcs-ref=master \
      org.label-schema.vcs-url=https://github.com/samurais/wechaty-vessel