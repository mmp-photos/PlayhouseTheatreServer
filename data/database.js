import mysql from 'mysql2';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

export async function getClasses() {
    const [rows] = await pool.query("SELECT * from academy_classes");
    // const [rows] = await pool.query("SELECT * FROM academy_classes LEFT JOIN locations ON academy_classes.location = locations.location_id LEFT JOIN person ON academy_classes.instructor = person.id")
    // const [rows] = await pool.query("SELECT * from classes");
    return rows;
}

export async function getUsers(req, res) {
    const { username, password } = req.body
    if(!username || ! password) return res.status(400).json({'message': "username and password are required"})
    let email = username
    const query = `SELECT * from users WHERE email = "${email}"`
    // const rows = await pool.query(query)
    const [rows, fields] = await pool.execute(query);
    console.log(rows)
    const resultArray = rows.map(row => {
        return {
          email: row.email,
          password: row.password,
          name: row.name,
        };
      });
    console.log(resultArray[0].email)
      
    if(!rows) return res.sendStatus(404)
    res.status(400).json({'message': 'request complete'})
    // const foundUser = rows.users.find(person => person.username === username)
    // console.log(foundUser)
    // if(!foundUser) return res.sendStatus(401)

    // const match = await bcrypt.compare(password, foundUser.password)
    // if(match){
    //     const accessToken = jwt.sign(
    //         { "username": username },
    //         process.env.ACCESS_TOKEN_SECRET,
    //         {expiresIn: '4800s'}
    //     );
    //     const refreshToken = jwt.sign(
    //         { "username": username },
    //         process.env.REFRESH_TOKEN_SECRET,
    //         {expiresIn: '1d'}
    //     )
        // SAVING REFRESH TOKEN TO CURRENT USER //
        // const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username)
        // const currentUser = { ...foundUser, refreshToken }
        // usersDB.setUsers([...otherUsers, currentUser])
        // await fsPromises.writeFile(
        //     path.join(__dirname, '..', 'models', 'users.json'),
        //     JSON.stringify(usersDB.users)
        // )
    // res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
    // res.json({ accessToken })
    // } else {
    //     res.sendStatus(401)
    // }
    // const [rows] = await pool.query("SELECT * FROM academy_classes LEFT JOIN locations ON academy_classes.location = locations.location_id LEFT JOIN person ON academy_classes.instructor = person.id")
    // const [rows] = await pool.query("SELECT * from classes");
}

export async function createClass(id, className){
    const result = await pool.query(`
        INSERT INTO classes (class_id, class_name)
        VALUES (? ,?)
    `, [id, className])
    return result;
}