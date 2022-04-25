const udp = require("dgram");

const buffer = require("buffer");

// creating a client socket
const client = udp.createSocket("udp4");

//buffer msg
const data = Buffer.from("c0a8d264");

const logger = (message) => {
  console.info(`Client: ${new Date().toISOString()} - ${message}`);
};

client.on("message", function (msg, info) {
  logger("Data received from server : " + msg.toString());
});

//sending msg
setInterval(() => {
  client.send(data, process.env.PORT, "localhost", function (error) {
    if (error) {
      client.close();
    } else {
      logger("Data sent !!!");
    }
  });
}, 3000);
