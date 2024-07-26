#Stage 1 on prend l'image maven qui nous servira a build notre application
FROM maven:3.6-openjdk-17 AS builder

WORKDIR /app

#Copie de pom.xml qui nous permettra d'installer les dependances
COPY pom.xml .

#Installation des dépendance
RUN mvn dependency:go-offline

#Copie du dossier source
COPY src ./src

#Build de l'application en sautant l'étape des tests
RUN mvn clean package -DskipTests

#Stage 2 l'image finale de notre application a partir d'openjdk
FROM openjdk:17-jdk-slim

LABEL author="alexandre.messuves@gmail.com"

#On copie notre fichier build depuis l'image maven qu'on a renommé builder
COPY --from=builder /app/target/todo_list_back-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8090

ENTRYPOINT ["java", "-jar", "app.jar"]
