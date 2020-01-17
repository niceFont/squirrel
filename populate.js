const axios = require("axios").default
const mysql = require("mysql2/promise")



const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "test",
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
})

const loops = typeof process.argv[2] !== "undefined" ? process.argv[2] : 1
let tasks = []
const amount = process.argv[3]

for (let index = 0; index < +loops; index++) {
    tasks = [...tasks, PopulateDB(amount)]
}
console.log(tasks.length)
async function PopulateDB(amount) {
    try {
        const response = await axios.get(`https://uinames.com/api/?amount=${amount}&region=germany`)
        const data = response.data

        data.map(async person => {
            try {
                await db.execute("INSERT INTO users(name) VALUES(?)", [person.name])
                console.log("adding: " + person.name)
            } catch (error) {
                console.error(error)
            }
        })
        return
    } catch (error) {
        console.error(error)
    }
}


Promise.all(tasks)