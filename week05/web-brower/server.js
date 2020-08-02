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
  <style>
    #container {
    width: 500px;
    height: 300px;
    display: flex;
    background-color: rgb(255,255,255);
    }
    #container #myid {
      width: 200px;
      height: 100px;
      background-color: rgb(255,0,0);
    }
    #container .c1 {
      flex: 1;
      background-color: rgb(0,255,0);
    }
</style>
</head>
<body>
  <div id="container">
    <div id="myid"></div>
    <div class="c1"></div>
</div>
</body>
</html>`);
    response.end();
  }).listen(8899);
  log.info('服务器已启动,监听8899端口');
};

start();
