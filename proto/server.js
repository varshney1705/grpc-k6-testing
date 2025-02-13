const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

// Load the proto file
const PROTO_PATH = './service.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const proto = grpc.loadPackageDefinition(packageDefinition).test;

// Implement the service
const server = new grpc.Server();

// Mock implementation of the GetData method
server.addService(proto.TestService.service, {
  GetData: (call, callback) => {
    console.log('Received request:', call.request);
    callback(null, { data: 'Sample Data' });
  },
});

// Start the server
server.bind('localhost:50051', grpc.ServerCredentials.createInsecure());
console.log('Server running at http://localhost:50051');
server.start();
