import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://209.46.121.142', // Replace with your API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

async function countDocuments() {
   return (await instance.get('/jee/full_text_corpus.json?sql=select+count%28*%29+from+documents')).data.rows[0][0];
}

export default instance;
export { countDocuments };