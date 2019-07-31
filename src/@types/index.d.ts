export interface IContext {
    env: string;
    clientId: string;
    clientSecret: string;
}

export interface IConfiguration {
    [profile: string]: IContext;
}

export interface IAuthentication {
    access_token: string;
    access_token_expires_at: string;
    refresh_token?: string;
    refresh_token_expires_at: string;
    scope: string;
    client: {
        id: string;
    };
    user: {
        id: string;
    };
}

export interface ICache {
    [profile: string]: IAuthentication;
}

export interface IThing {
    "@type": string;
    "id": string;
    "owningUserId": string;
    "createdAt": string;
    "updatedAt": string;
}
