/**
 * Pay From Merchant to Customer
 * Guide Link: https://developer.paypal.com/docs/checkout/integration-features/pay-another-account/
 */
const paypal = require('@paypal/checkout-server-sdk');

const env = new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT, process.env.PAYPAL_SECRET);
const client = new paypal.core.PayPalHttpClient(env);

const payByPaypal = async (req, res) => {

    const request = new paypal.orders.OrdersCreateRequest();

    request.prefer("return=representation");
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: '66.00'
            },
            payee: {
                email_address: 'sb-vrk3a4796205@personal.example.com'
            }
        }]
    });

    let order;
    try {
        order = await client.execute(request);
    } catch (err) {

        // 4. Handle any errors from the call
        console.error(err);
        return res.send(500);
    }

    // 5. Return a successful response to the client with the order ID
    // await captureOrder(order.result.id);
    return order;
}

module.exports = {
    payByPaypal
}