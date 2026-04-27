import ImageKit from '@imagekit/nodejs';

const client = new ImageKit({
  privateKey: process.env.Imagekit_PublicKey, 
 publickey:process.env.Imagekit_PrivateKey,
 urlEndpoint:process.env.Imagekit_urlEndpoint
});

export default client;