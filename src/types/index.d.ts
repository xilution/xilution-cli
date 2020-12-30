export interface IContext {
  env: string;
  organizationId: string;
  clientId: string;
  clientSecret?: string;
  username?: string;
  password?: string;
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
