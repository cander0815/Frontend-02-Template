const http = require('http');
const log = {
  info(msg) {
    console.log(new Date().toLocaleTimeString() + msg);
  }
};

var start = function () {
  http.createServer(function (request, response) {
    console.log(request);
    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
    response.write(`<html lang="en">
<head>
  <title>Document</title>
</head>
<body>
  <h1>hello cander</h1>
  <span>aaa</span>
</body>
</html>`);
    response.end();
  }).listen(8899);
  log.info('服务器已启动,监听8899端口');
};

start();
