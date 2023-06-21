import axios from 'axios';
export {findImages};

async function findImages (name, perPg, pag) {
  const bazUrl = 'https://pixabay.com/api/';
  const keyApi = '?key=37398613-53a7a48ec351839bec483185f';
  const auxiliaryUrl =
    '&image_type=photo&orientation=horizontal&safesearch=true';
  const respons = await axios.get (
    `${bazUrl}${keyApi}&q=${name}${auxiliaryUrl}&per_page=${perPg}&page=${pag}`
  );
  return respons;
}
