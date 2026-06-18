.PHONYY: dev stop infra

infra:
	docker compose up -d

dev: infra
	cd api/CorretoraApi && dotnet run &
	cd bff && npm run start:dev &
	cd web && npm run dev

stop:
	docker compose stop
	pkill -f "dotnet run" || true
	pkill -f "npm run start:dev" || true
	pkill -f "npm run dev" || true