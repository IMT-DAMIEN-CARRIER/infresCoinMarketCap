PROJECT = "InfresCoinMarketCap"
DELIMITER = "....."
CLIENT_IMAGE_NAME = "infrescoinmarketcap_client_dev"
CLIENT_CONTAINER_NAME = "client_dev"
API_IMAGE_NAME = "infrescoinmarketcap_api_dev"
API_CONTAINER_NAME = "api_dev"

up: build-api run-api build-client run-client

build-client: ;@echo "Build de l'image docker du client ${PROJECT}${DELIMITER}"; \
	docker build client/. -t ${CLIENT_IMAGE_NAME}

build-api: ;@echo "Build de l'image docker de l'API ${PROJECT}${DELIMITER}"; \
	docker build api/. -t ${API_IMAGE_NAME}

run-client: ;@echo "Lancement du client ${PROJECT}${DELIMITER}"; \
	docker run -p 3001:3001 --name ${CLIENT_CONTAINER_NAME} -d ${CLIENT_IMAGE_NAME}

run-api: ;@echo "Lancement de l'API ${PROJECT}${DELIMITER}"; \
	docker run -p 3000:3000 --name ${API_CONTAINER_NAME} -d ${API_IMAGE_NAME}

down: ;@echo "Arrêt total de l'environnement de dev ${PROJECT}${DELIMITER}"; \
	docker stop ${CLIENT_CONTAINER_NAME}; \
	docker stop ${API_CONTAINER_NAME}; \
	docker rm ${CLIENT_CONTAINER_NAME}; \
	docker rm ${API_CONTAINER_NAME}; \
	docker image rm ${CLIENT_IMAGE_NAME}; \
	docker image rm ${API_IMAGE_NAME}

test: ;@echo "Test ${PROJECT}....."; \
	cd api; \
	npm test