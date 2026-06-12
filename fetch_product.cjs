const sanityClient = require('@sanity/client');
const client = sanityClient.createClient({
  projectId: 'nzcwegq7',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2021-06-07'
});

client.fetch(`*[_type == "product" && slug.current == "profil-poprzeczny-rockfon-166791-0-6-106005"][0]{
  name,
  "images": images[].asset->url
}`).then(res => console.log(JSON.stringify(res, null, 2))).catch(console.error);
