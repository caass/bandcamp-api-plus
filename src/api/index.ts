import { Artist, getLabelArtists } from './artists';
import { getCredentials } from './auth';
import { getLabelMerch, MerchItem } from './merch';

export class BandcampApiClient {
  private accessToken: Promise<string>;
  public refreshToken: Promise<string>;
  private labelBandID: string | undefined;

  constructor(clientID: string, clientSecret: string, refreshToken?: string) {
    const response = getCredentials(clientID, clientSecret, refreshToken).catch(
      (error) => {
        throw error;
      }
    );

    this.accessToken = response.then(({ accessToken }) => accessToken);
    this.refreshToken = response.then(({ refreshToken }) => refreshToken);
  }

  async artists(): Promise<Artist[]> {
    const { labelBandID, artists } = await getLabelArtists(
      await this.accessToken
    );
    this.labelBandID = labelBandID;
    return artists;
  }

  async merch(startDate?: Date): Promise<MerchItem[]> {
    const awaitedAccessToken = await this.accessToken;

    if (this.labelBandID === undefined) {
      // this sucks
      await getLabelArtists(awaitedAccessToken);
      return this.merch(startDate);
    }

    return await getLabelMerch(awaitedAccessToken, this.labelBandID, startDate);
  }
}
