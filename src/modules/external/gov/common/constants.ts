import * as https from 'https';

export const GOV_API_BASE_URL = 'https://api.data.gov.sg/v1';

// NOTE: getting some error with tls, unblock.
// NOTE: might need some certs?
export const httpsAgent = new https.Agent({ rejectUnauthorized: false });
