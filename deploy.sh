# Build image using new BuildKit engine
COMPOSE_DOCKER_CLI_BUILD=1 \
DOCKER_BUILDKIT=1 \
docker-compose \
    -f docker-compose.yml \
    build --parallel

# --renew-anon-volumes
# redis retrieves the volume from previous containers after being killed, so without this
# flag, cache would only be cleared if you waited for the container to fully stop.
docker-compose \
    -f docker-compose.yml \
    up --renew-anon-volumes -d
