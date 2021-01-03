import axios from 'axios';

export type Artist = {
  bandID: string;
  subdomain: string;
  name: string;
};

type LabelArtists = {
  labelBandID: string;
  artists: Artist[];
};

export const getLabelArtists = async (
  accessToken: string
): Promise<LabelArtists> => {
  const response = await axios({
    method: 'POST',
    url: 'https://bandcamp.com/api/account/1/my_bands',
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status !== 200) {
    return Promise.reject(
      `Error accessing Bandcamp API: ${JSON.stringify(response.data)}`
    );
  }

  const { band_id, member_bands } = response.data.bands[0];

  return {
    labelBandID: band_id,
    artists: member_bands,
  };
};
