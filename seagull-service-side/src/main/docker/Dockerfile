# 1. 指定基础镜像
FROM openjdk:8-jdk-alpine

# 2. 维护者信息
LABEL maintainer="582948588@qq.com"

# 3、镜像操作指令
# 因为spring boot内嵌的tomcat默认运行目录为tmp 挂载
VOLUME /tmp
ARG DEPENDENCY=target/dependency
COPY ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY ${DEPENDENCY}/META-INF /app/META-INF
COPY ${DEPENDENCY}/BOOT-INF/classes /app

# 容器启动执行指令
ENTRYPOINT ["java","-cp","app:app/lib/*","com.github.geng.Application"]

