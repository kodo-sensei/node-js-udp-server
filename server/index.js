const udp = require("dgram");
const { convertHextoIP } = require("./utils/decoder");
const { post } = require("./utils/service");

// --------------------creating a udp server --------------------
// creating a udp server
const server = udp.createSocket("udp4");

const logger = (message) => {
  console.log(`Server: ${new Date().toUTCString()} - ${message}`);
};

// emits when any error occurs
server.on("error", function (error) {
  logger("Error: " + error);
  server.close();
});

// emits on new datagram msg
server.on("message", async function (msg, info) {
  logger("Data received from client : " + convertHextoIP(msg.toString()));
  const response = await post(
    "https://posthere.io/ad90-4d2c-b870",
    {
      ipAdress: convertHextoIP(msg.toString()),
      email: "adamsokode@gmail.com",
      createdAt: new Date().toISOString(),
    }
  );

  logger(response)
  //sending msg
  // setInterval(() => {
  //   server.send(msg, info.port, "localhost", function (error) {
  //     if (error) {
  //       client.close();
  //     } else {
  //       logger("Data sent !!!");
  //     }
  //   });
  // }, 4000);
});

//emits when socket is ready and listening for datagram msgs
server.on("listening", function () {
  var address = server.address();
  var port = address.port;
  var family = address.family;
  var ipaddr = address.address;
  logger("Server is listening at port" + port);
  logger("Server ip :" + ipaddr);
  logger("Server is IP4/IP6 : " + family);
});

//emits after the socket is closed using socket.close();
server.on("close", function () {
  logger("Socket is closed !");
});

server.bind(process.env.PORT);
