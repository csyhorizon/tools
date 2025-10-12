# 2025/10 Now Using Gradle 8.14.3 with JDK 21 on Alpine for build stage
# If you care about security, Please select the appropriate JDK version.
FROM gradle:8.14.3-jdk21-alpine AS build
WORKDIR /app

COPY build.gradle settings.gradle ./
COPY gradle ./gradle

RUN gradle dependencies --no-daemon

COPY src ./src

RUN gradle clean build --no-daemon -x test

# Same here too!!
FROM eclipse-temurin:21-jre-jammy

ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app

COPY --from=build /app/build/libs/app.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]