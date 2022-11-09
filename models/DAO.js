import sqlite3 from 'sqlite3'
class DAO{
    constructor(dbFilePath){
        this.db = new sqlite3.Database(dbFilePath, (err) => {  //cần truyền vào một đường dẫn đến file csdl sqlite để khởi tạo một kết nối đến file để bắt đầu đọc ghi
            if (err) {
                console.log('Could not connect to database', err)   //Kết nối chưa thành công, có lỗi
            } else {
                console.log('Connected to database')   //Đã kết nối thành công và sẵn sàng để đọc ghi DB
            }
        });
    }
    async runquery(sql){
        return new Promise((resolve, reject) => {
            this.db.run(sql, (err)=>{
                if (err) {   //Trường hợp lỗi
                    console.log('Error running sql ' + sql)
                    console.log(err)
                    reject(err)
                } else {   //Trường hợp chạy query thành công
                    resolve("Commands completed successfully.")   //Trả về kết quả là một object có id lấy từ DB.
                }
            })
        })
    }
    async get(sql){
        return new Promise((resolve, reject) =>{
            this.db.get(sql, (err, result) =>{ 
                if (err) {
                    console.log('Error running sql: ' + sql)
                    console.log(err)
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }
    async getAll(sql){
        return new Promise((resolve, reject) =>{
            this.db.all(sql, (err, rows) =>{
                if (err) {
                    console.log('Error running sql: ' + sql)
                    console.log(err)
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }
}
export default DAO