import ImageKit from '@imagekit/nodejs';

const client = new ImageKit({
  privateKey: process.env.Imagekit_PRIVATE_KEY, 
 publickey:process.env.Imagekit_PUBLIC_KEY,
 urlEndpoint:process.env.Imagekit_URL_ENDPOINT,
  timeout:60000,
});

export default client;