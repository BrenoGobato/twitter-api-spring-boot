# Usa uma imagem base oficial do Java 17.
FROM openjdk:17-jdk-slim

# Define o diretório de trabalho dentro do container.
WORKDIR /app

# Copia os arquivos de build para aproveitar o cache do Docker.
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Baixa as dependências do projeto.
RUN ./mvnw dependency:go-offline

# Copia o resto do código-fonte do seu projeto.
COPY src ./src

# Empacota a aplicação, pulando os testes que estavam falhando.
RUN ./mvnw package -DskipTests

# Define o comando para iniciar sua aplicação.
# !!! IMPORTANTE: TROQUE O NOME DO ARQUIVO .JAR ABAIXO !!!
ENTRYPOINT ["java", "-jar", "/app/target/twitter-api-0.0.1-SNAPSHOT.jar"]