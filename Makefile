.PHONY: start stop frontend backend

start:
	@echo "Starting backend and frontend..."
	@$(MAKE) -j2 frontend backend

stop:
	@echo "Stopping backend and frontend..."
	-@lsof -ti:3000 | xargs kill -9 2>/dev/null || true
	-@lsof -ti:3001 | xargs kill -9 2>/dev/null || true
	@echo "Both services have been stopped."

frontend:
	cd frontend && npm start

backend:
	cd backend && npm run start:dev
