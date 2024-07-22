# Utiliser une image de base contenant le JDK de Java
FROM openjdk:17-jdk-slim

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier JAR de votre application dans le conteneur
COPY target/todo_list_back-0.0.1-SNAPSHOT.jar app.jar

# Exposer le port que l'application utilise
EXPOSE 8090

# Définir la commande pour exécuter l'application
ENTRYPOINT ["java", "-jar", "app.jar"]
