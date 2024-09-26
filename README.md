# Caching Proxy Server

This is a caching proxy server built with Express, TypeScript and Commander based on the [roadmap.sh Caching Proxy project](https://roadmap.sh/projects/caching-server).It forwards requests to a specified origin server and caches the responses for subsequent requests. The server can be started with command-line options, and it provides a mechanism to clear the cache.

## Features

- Forward requests to an origin server.
- Cache responses for faster subsequent access.
- Indicate whether the response was served from the cache or the origin server.
- Clear the cache via a command-line command.

## Usage

To start the caching proxy server, clone the repository and use the following commands:

```bash
node dist/index.js --port <number> --origin <url>
```

For example, to start the server on port 3000 with an origin of http://dummyjson.com, run:

```bash
node dist/index.js --port 3000 --origin http://dummyjson.com
```
