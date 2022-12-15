import aws from 'aws-sdk';

const apiGateway = new aws.APIGateway({
    region: 'ap-south-1',
});

export async function handler(event: any) {
    const email = event.email;

    const createApiKeyParams: aws.APIGateway.CreateApiKeyRequest = {
        name: email,
        description: `Email - ${email}. Created: ${new Date().toISOString()}`,
        enabled: true
    };
    const createResponse = await apiGateway.createApiKey(createApiKeyParams).promise();

    await apiGateway.createUsagePlanKey({
        usagePlanId: 'o46sln',
        keyId: createResponse.id,
        keyType: 'API_KEY'
    }).promise();

    // associate with stripe

    // save it in your database with the stripe customer id, possibly the subscription id, and the apiKey
}