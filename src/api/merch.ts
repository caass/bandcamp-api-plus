import axios from 'axios';

// TODO
export type MerchItem = any;

export const getLabelMerch = async (
  accessToken: string,
  labelBandID: string,
  startDate?: Date
): Promise<MerchItem[]> => {
  const start_time = startDate
    ? `${startDate.getFullYear()}-${`0${startDate.getMonth()}`.slice(
        -2
      )}-${`0${startDate.getDate()}`.slice(-2)}`
    : '2000-01-01';

  const response = await axios({
    method: 'POST',
    url: 'https://bandcamp.com/api/merchorders/1/get_merch_details',
    data: JSON.stringify({
      band_id: labelBandID,
      start_time,
    }),
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

  return response.data.items;
};
