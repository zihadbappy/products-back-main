const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/*.js"]; // Update with your route files

swaggerAutogen(outputFile, endpointsFiles);