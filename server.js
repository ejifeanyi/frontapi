#!/usr/bin/env node

const express = require("express");
const { Command } = require("commander");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const program = new Command();

program.version("1.0.0").description("HTTP Mock Server");

program
	.command("start")
	.description("Start the mock server")
	.option("--port <port>", "Server initiated on port", 8080)
	.option("--config <path>", "Path to config file", "mocks.json")
	.action((options) => {
		const port = options.port;
		const configPath = path.resolve(options.config);

		// Middleware to parse JSON request bodies
		app.use(express.json());

		// Enable CORS
		app.use(cors());

		// Read and parse the configuration file
		let config;
		try {
			const configData = fs.readFileSync(configPath, "utf-8");
			config = JSON.parse(configData);
		} catch (err) {
			console.error(`Error reading config file: ${err.message}`);
			process.exit(1);
		}

		// In-memory storage
		const storage = {};

		// Validate and setup endpoints
		config.endpoints.forEach((endpoint) => {
			const method = endpoint.method.toLowerCase();
			const validMethods = ["get", "post", "put", "delete", "patch"];

			if (!validMethods.includes(method)) {
				console.error(
					`Invalid method "${method}" for endpoint ${endpoint.path}`
				);
				process.exit(1);
			}

			// Initialize storage for the endpoint if it's a collection
			if (method === "get" && endpoint.path.endsWith("/")) {
				storage[endpoint.path] = [];
			}

			// Define the endpoints dynamically
			app[method](endpoint.path, (req, res) => {
				const pathKey = endpoint.path.replace(
					/:\w+/g,
					(match) => req.params[match.substring(1)]
				);
				const collectionPath = endpoint.path.replace(/\/:\w+$/, "/");
				let data = storage[collectionPath] || [];

				switch (method) {
					case "get":
						if (endpoint.path.endsWith("/:id")) {
							const item = data.find(
								(item) => item.id === parseInt(req.params.id)
							);
							res
								.status(item ? endpoint.status : 404)
								.json(item || { error: "Not found" });
						} else {
							res.status(endpoint.status).json(data);
						}
						break;
					case "post":
						const newItem = { ...req.body, id: data.length + 1 };
						data.push(newItem);
						storage[collectionPath] = data;
						res.status(endpoint.status).json(newItem);
						break;
					case "put":
						const putIndex = data.findIndex(
							(item) => item.id === parseInt(req.params.id)
						);
						if (putIndex !== -1) {
							data[putIndex] = { ...data[putIndex], ...req.body };
							res.status(endpoint.status).json(data[putIndex]);
						} else {
							res.status(404).json({ error: "Not found" });
						}
						break;
					case "delete":
						const deleteIndex = data.findIndex(
							(item) => item.id === parseInt(req.params.id)
						);
						if (deleteIndex !== -1) {
							const deletedItem = data.splice(deleteIndex, 1);
							res.status(endpoint.status).json(deletedItem[0]);
						} else {
							res.status(404).json({ error: "Not found" });
						}
						break;
					default:
						res.status(405).json({ error: "Method not allowed" });
				}

				// Update the storage
				storage[collectionPath] = data;
			});
		});

		app.listen(port, () => {
			console.log(`Mock server running on port ${port}`);
		});
	});

program.parse(process.argv);
