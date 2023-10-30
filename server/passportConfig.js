module.exports = {
    "credentials": {
        "tenantName": process.env.TENANT_NAME,
        "clientID": process.env.CLIENT_ID
    },
    "policies": {
        "policyName": process.env.POLICY_NAME
    },
    "resource": {
        "scope": ["FullReadWriteAccess"]
    },
    "metadata": {
        "authority": "login.microsoftonline.com",
        "discovery": ".well-known/openid-configuration",
        "version": "v2.0"
    },
    "settings": {
        "isB2C": true,
        "validateIssuer": true,
        "passReqToCallback": false,
        "loggingLevel": "info"
    }
};