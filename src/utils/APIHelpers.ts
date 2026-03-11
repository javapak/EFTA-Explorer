import api from '../rest-client/AxiosInstance';


export async function getRedactionStatsFromEFTANumber(eftaNumber: string) {
    const sql = `SELECT proper_redactions, total_redactions
    FROM document_summary WHERE efta_number = '${eftaNumber}'`;
    const res = await api.get('/jee/redaction_analysis_v2.json', {params: {sql}})
    const structuredRes = {properRedactions: res.data.rows[0][0], totalRedactions: res.data.rows[0][1]}
    return structuredRes;
}

export async function getNumberOfImagesAssociatedToEFTANumber(eftaNumber: string) {
    const sql = `SELECT COUNT(*) FROM images WHERE efta_number = '${eftaNumber}';`
    const res = await api.get('/jee/image_analysis.json', {params: {sql}})
    console.log('images result ', res.data);
    return res.data.rows.length as number;
}