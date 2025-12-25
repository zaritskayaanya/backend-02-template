const http = require('http');
const { getUsers } = require('./backend-02-template-main/src/users');

const PORT = process.env.PORT || 3003;
const HOST = '127.0.0.1';

const server = http.createServer(async (request, response) => {
    const url = new URL(request.url, `http://${HOST}:${PORT}`);
    const params = url.searchParams;

    if (params.has('hello')) {
        const name = params.get('hello');
        
        if (name && name.trim() !== '') {
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end(`Hello, ${name}.`);
        } else {
            response.writeHead(400, { 'Content-Type': 'text/plain' });
            response.end('Enter a name');
        }
    }
    else if (params.has('users')) {
        try {
            const users = await getUsers();
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(users));
        } catch (error) {
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.end('Internal Server Error');
        }
    }
    else if (url.search === '' || (url.search === '?' && params.toString() === '')) {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end('Hello, World!');
    }
    else {
        response.writeHead(500);
        response.end('');
    }
});

server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});