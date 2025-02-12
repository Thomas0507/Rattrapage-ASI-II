#########-------FIRST BUILDER CONTAINER---------
FROM docker.io/azul/zulu-openjdk-alpine:23-latest
WORKDIR /app/
   
#---------copy source code---------
RUN apk add --update --no-cache maven
COPY . /app/

#---------dependencies installation && compilation---------
RUN mvn clean compile package
EXPOSE 8080
CMD java -jar target/asi-ii-0.0.1-SNAPSHOT.jar