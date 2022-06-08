FROM openjdk:17

COPY ./bin /bin
WORKDIR /bin

ENV TENANT_ID 72384895-650b-4425-89f2-af78895198e3
ENV DEVICE_ID 675bb0ca-7511-4a58-930c-eb64bd8bdf3f

# "675bb0ca-7511-4a58-930c-eb64bd8bdf3f@72384895-650b-4425-89f2-af78895198e3:my-password-123"
# Basic Njc1YmIwY2EtNzUxMS00YTU4LTkzMGMtZWI2NGJkOGJkZjNmQDcyMzg0ODk1LTY1MGItNDQyNS04OWYyLWFmNzg4OTUxOThlMzpteS1wYXNzd29yZC0xMjM=

ENV AMQP_NETWORK_IP 127.0.0.1
ENV REGISTRY_IP 127.0.0.1
ENV HTTP_ADAPTER_IP 127.0.0.1
ENV MQTT_ADAPTER_IP 127.0.0.1

CMD ["java", "-jar", "hono-cli-1.12.2-exec.jar", "--hono.client.host=host.docker.internal", "--hono.client.port=15672", "--hono.client.username=consumer@HONO", "--hono.client.password=verysecret", "--spring.profiles.active=receiver", "--tenant.id=72384895-650b-4425-89f2-af78895198e3"]
