# FrontAPI

**FrontAPI** is a flexible and lightweight HTTP mock server built with Express.js. It allows you to easily mock RESTful API endpoints for testing and development purposes, providing a convenient way to simulate a backend server.

## Features

- **Easy to Use**: Set up and run a mock server with minimal configuration.
- **Flexible Endpoints**: Define multiple endpoints with various HTTP methods.
- **Custom Responses**: Configure responses for different endpoints, including status codes and JSON payloads.
- **Supports CRUD**: Handle GET, POST, PUT, DELETE, and PATCH requests.
- **CORS Support**: Enabled by default for seamless integration with frontend applications.

## Installation

You can install FrontAPI globally using npm:

```bash
npm install -g frontapi
```

## Usage

To start the mock server, use the frontapi command followed by the start subcommand. You can specify the port and configuration file:

```bash
frontapi start --port 8080 --config mocks.json
```

## Configuration

The configuration file (mocks.json) defines the endpoints and their responses. Here’s an example configuration file:

```bash
{
    "endpoints": [
        {
            "method": "get",
            "path": "/api/items",
            "status": 200,
            "response": [
                { "id": 1, "name": "Item 1" },
                { "id": 2, "name": "Item 2" }
            ]
        },
        {
            "method": "post",
            "path": "/api/items",
            "status": 201,
            "response": { "message": "Item created successfully" }
        },
        {
            "method": "get",
            "path": "/api/items/:id",
            "status": 200,
            "response": { "id": 1, "name": "Item 1" }
        },
        {
            "method": "put",
            "path": "/api/items/:id",
            "status": 200,
            "response": { "message": "Item updated successfully" }
        },
        {
            "method": "delete",
            "path": "/api/items/:id",
            "status": 200,
            "response": { "message": "Item deleted successfully" }
        }
    ]
}
```

### 1. Create a Configuration File:

Create a file named mocks.json in your project root directory with the following content:

```bash
{
    "endpoints": [
        {
            "method": "get",
            "path": "/api/items",
            "status": 200,
            "response": [
                { "id": 1, "name": "Item 1" },
                { "id": 2, "name": "Item 2" }
            ]
        },
        {
            "method": "post",
            "path": "/api/items",
            "status": 201,
            "response": { "message": "Item created successfully" }
        },
        {
            "method": "get",
            "path": "/api/items/:id",
            "status": 200,
            "response": { "id": 1, "name": "Item 1" }
        },
        {
            "method": "put",
            "path": "/api/items/:id",
            "status": 200,
            "response": { "message": "Item updated successfully" }
        },
        {
            "method": "delete",
            "path": "/api/items/:id",
            "status": 200,
            "response": { "message": "Item deleted successfully" }
        }
    ]
}
```

Feel free to edit this to fit what your project needs.

### 2. Start the Mock Server:

Run the following command to start the mock server on port 8080:

```bash
frontapi start --port 8080 --config mocks.json
```

### 3. Test Endpoints:

You can use tools like Postman or Insomnia to test the endpoints. You can also use it in your frontend application

