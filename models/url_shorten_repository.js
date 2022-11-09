
class UrlShortenRepository{
    constructor(dao){
        this.dao = dao;
    }
    createTable() {   //Hàm tạo bảng này sẽ dùng để tạo ra cấu trúc bảng projects nếu trong file csdl sqlite3 chưa có bảng này.
        const sql = `
            CREATE TABLE IF NOT EXISTS URL_SHORTEN (
                ID TEXT PRIMARY KEY,
                ORIGINAL_URL TEXT NOT NULL,
                SHORTEN_URL TEXT NOT NULL,
                CLICK INTEGER DEFAULT 0,
                DATE_CREATED DATE
            )
        `
        return this.dao.runquery(sql)
    }
    async insert(data){
        const {id, original_url, shorten_url, date_created, expired_date} = data
        return await this.dao.runquery(`
            INSERT INTO URL_SHORTEN(ID, ORIGINAL_URL,SHORTEN_URL, DATE_CREATED)
            VALUES ('${id}', '${original_url}', '${shorten_url}', '${date_created}')
        `)
    }
    update(data){
        /*
            const { id, name } = project
            return this.dao.runquery(
            `UPDATE projects SET name = ? WHERE id = ?`,
            [name, id]
            )
        */ 
        return
    }
    delete(id){
        return this.dao.runquery(
            `DELETE FROM URL_SHORTEN WHERE ID = '${id}'`
        )
    }
    getById(id) {
        return this.dao.get(
            `SELECT * FROM URL_SHORTEN WHERE id = '${id}'`
        )
    }
    getOriginalUrl(id)  {
        return this.dao.get(
            `SELECT ORIGINAL_URL FROM URL_SHORTEN WHERE id = '${id}'`
        )
    }
    async getDataByOriginUrl(origin_url) {
        return await this.dao.get(
            `SELECT * FROM URL_SHORTEN WHERE ORIGINAL_URL = '${origin_url}'`
        )
    }
    getAll(){
        return this.dao.getAll("select * from URL_SHORTEN")
    }
}
export default UrlShortenRepository