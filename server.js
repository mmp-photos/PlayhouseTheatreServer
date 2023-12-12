import http from 'http';
import path from 'path';
import fs from 'fs';
import { promises as fsPromises } from 'fs';

const PORT = process.env.PORT || 3500

const server = http.createServer((req, res) => {
    console.log(req.url, req.method)
});

server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));