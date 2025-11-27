FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Copiar el jar generado por Spring Boot
COPY target/*.jar app.jar

# Copiar script wait-for-it (opcional, para esperar a MySQL)
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Exponer puerto 8080
EXPOSE 8080

# Arrancar la app y esperar a MySQL
ENTRYPOINT ["/wait-for-it.sh", "mysql:3306", "--timeout=30", "--", "java", "-jar", "app.jar"]
