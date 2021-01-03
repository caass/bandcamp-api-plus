import axios from 'axios';
import { stringify as queryStringify } from 'qs';

type CredentialsRequestBody = {
  client_id: string;
  client_secret: string;
  grant_type: 'refresh_token' | 'client_credentials';
  refresh_token?: string;
};

type CredentialsResponse = {
  refreshToken: string;
  accessToken: string;
};

export const getCredentials = async (
  clientId: string,
  clientSecret: string,
  refreshToken?: string
): Promise<CredentialsResponse> => {
  const body: CredentialsRequestBody = {
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: refreshToken ? 'refresh_token' : 'client_credentials',
  };

  if (refreshToken) {
    body.refresh_token = refreshToken;
  }

  const response = await axios({
    method: 'POST',
    url: 'https://bandcamp.com/oauth_token',
    data: queryStringify(body),
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });

  if (response.status !== 200) {
    return Promise.reject(
      `Error authorizing with Bandcamp API: ${JSON.stringify(response.data)}`
    );
  }

  return {
    refreshToken: response.data.refresh_token,
    accessToken: response.data.access_token,
  };
};
