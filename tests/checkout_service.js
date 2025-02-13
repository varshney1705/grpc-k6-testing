import grpc from 'k6/net/grpc';
import { check, sleep } from 'k6';

const client = new grpc.Client();
client.load([], '../proto/service.proto');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                                                                
export let options = {
    vus: 10, // Simulate 10 virtual users
    duration: '30s', // Run test for 30 seconds
};

export default function () {
    client.connect('localhost:50051', { plaintext: true });

    // ✅ TestService - GetData RPC
    let testResponse = client.invoke('test.TestService/GetData', { id: '123' });

    check(testResponse, {
        'TestService response is valid': (res) => res && res.status === grpc.StatusOK,
    });

    // ✅ Step 1: Process Payment
    let paymentResponse = client.invoke('test.PaymentService/ProcessPayment', {
        user_id: '12345',
        amount: 100.00,
        currency: 'USD',
        payment_method: 'credit_card'
    });

    check(paymentResponse, {
        'Payment is successful': (res) => res && res.status === grpc.StatusOK,
    });

    // ✅ Step 2: Check Inventory
    let inventoryResponse = client.invoke('test.InventoryService/CheckStock', {
        product_id: 'ABC123',
        quantity: 1
    });

    check(inventoryResponse, {
        'Product is in stock': (res) => res && res.message.available === true,
    });

    // ✅ Step 3: Place Order via CheckoutService
    let orderResponse = client.invoke('test.CheckoutService/PlaceOrder', {
        user_id: '12345',
        product_id: 'ABC123',
        quantity: 1
    });

    check(orderResponse, {
        'Order is placed successfully': (res) => res && res.status === grpc.StatusOK,
    });

    // ✅ Step 4: Create Order in Fulfillment
    let fulfillmentResponse = client.invoke('test.FulfillmentService/CreateOrder', {
        order_id: 'ORDER9876',
        user_id: '12345',
        shipping_address: '123 Street, NY'
    });

    check(fulfillmentResponse, {
        'Order is fulfilled successfully': (res) => res && res.status === grpc.StatusOK,
    });

    client.close();
    sleep(1); // Simulate user delay between requests
}
