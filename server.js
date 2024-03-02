const fs = require('fs'),
    path = require('path'),
    http = require('http'),
    eventEmitter = require('events');

// const emitter = new eventEmitter();

// emitter.on('message1', (message) => {
//     console.log(message);
// });


// emitter.emit('message1', {
//     data: "Husain"
// });

const app = http.createServer((req, res) => {
    const route = req.url;

    if (route === '/favicon.ico') {
        res.writeHead(204, {
            'Content-Type': 'image/x-icon'
        });
        res.end();
        return;
    }

    let filePath = path.join(__dirname, 'public', route === '/' ? 'home.html' : route);
    const ext = path.extname(filePath);
    let contentType = 'text/html';

    if(!ext){
        filePath += '.html';
    }

    switch (ext) {
        case '.css': contentType = 'text/css'; break;
        case '.js': contentType = 'text/javascript'; break;
        case '.png': contentType = 'image/png'; break;
        default: contentType = 'text/html';
    }

    if (fs.existsSync(filePath)) {
        console.log(filePath);
        fs.readFile(filePath, (err, data) => {
            if (err) {
                fs.readFile(path.join(__dirname, 'public', 'error.html'), (err, data) => {
                    if (err) {
                        res.writeHead(500)
                        res.end('Error!!!!');
                    } else {
                        res.writeHead(404, {
                            'Content-Type': contentType
                        })
                        res.end(data);
                    }
                });
            }
            else {
                res.writeHead(200, {
                    'Content-Type': contentType
                });
                res.end(data);
            }
        })
   }else{
        res.writeHead(200, {
            'Content-Type': contentType
        });
        fs.readFile(path.join(__dirname, 'public', 'home.html'),(err, data)=>{
            res.end(data);
        });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
