FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Copiar el jar generado por Spring Boot
COPY target/*.jar app.jar

# Copiar script wait-for-it
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

EXPOSE 8080

ENTRYPOINT ["/wait-for-it.sh", "mysql:3306", "--timeout=30", "--", "java", "-jar", "app.jar"]
