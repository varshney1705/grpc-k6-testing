import grpc from 'k6/net/grpc';
import { check, sleep } from 'k6';

const client = new grpc.Client();

// Load the proto file (make sure the path is correct)
client.load([], '../proto/service.proto');

export default () => {
    // Connect to the gRPC server
    client.connect('localhost:50051', { plaintext: true });

    // Invoke the gRPC method
    let response = client.invoke('test.TestService/GetData', { id: '123' });

    // Perform checks on the response
    check(response, {
        'is status OK': (r) => r && r.status === grpc.StatusOK,
        'response contains data': (r) => r.message && r.message.data !== '',
    });

    // Close the client connection
    client.close();
    sleep(1);
};
