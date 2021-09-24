PROJECT = "InfresCoinMarketCap"

test: ;@echo "Test ${PROJECT}....."; \
	cd api; \
	./node_modules/mocha/bin/mocha
