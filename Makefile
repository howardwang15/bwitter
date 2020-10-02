.PHONY: build dev psql

build:
	docker-compose build

dev:
	docker-compose up

psql:
	docker exec -it $$(docker ps -aqf "name=postgres*") psql -U postgres
