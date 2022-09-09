server: 
	node server.js

ui:
	cd ui && npm install
	cd ui && npm run dev

.PHONY: ui server