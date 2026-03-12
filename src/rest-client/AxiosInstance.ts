import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://apaks.dev',
    headers: {
        'Content-Type': 'application/json',
    },
});

async function countDocuments() {
   return (await instance.get('/jee/full_text_corpus.json?sql=select+count%28*%29+from+documents')).data.rows[0][0];
}

export default instance;
export { countDocuments };