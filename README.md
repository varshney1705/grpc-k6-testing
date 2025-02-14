# grpc-k6-testing
Step-by-Step Setup and Installation
1️⃣ Install Required Dependencies
📌 Install k6
sudo apt update && sudo apt install -y snapd  
sudo snap install k6  

📌 Install Protocol Buffers Compiler (protoc)
sudo apt install -y protobuf-compiler  
protoc --version  # Verify installation  

📌 Install Node.js and gRPC Tools
sudo apt install -y nodejs npm  
npm install -g grpc-tools @grpc/proto-loader  

2️⃣ Set Up Your gRPC Service
📌 Define a gRPC Service in service.proto
📌 Generate gRPC Stub Files 
protoc --js_out=import_style=commonjs,binary:. --grpc_out=. service.proto
3️⃣ Create Your k6 gRPC Test Script
📌 Install k6 gRPC Extension
npm install k6/net/grpc  
📌 Write the k6 Test (grpc_test.js)
4️⃣ Run the Performance Test
📌 Start the gRPC Server
node server.js  
📌 Execute the k6 Test
k6 run grpc_test.js  
5️⃣ Integrate with CI/CD Pipeline
📌 Add to Jenkins/GitHub Actions for Automated Testing
steps:
  - name: Run k6 gRPC Test
    run: k6 run grpc_test.js

