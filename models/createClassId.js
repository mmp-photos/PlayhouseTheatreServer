import { pool } from '../data/database2.js';

export function createClassId(class_term, class_name){
    let text = class_term;
    let result = text.slice(2, 6);
    
    let text2 = class_name;
    let myArray = text2.split(" ");
    let result2 = text2.slice(0, 1);
    let result3 = myArray[1].slice(0, 1);
    
    let rand = Math.floor(Math.random() * 10)
    
    let finalName = result + result2 + rand + result3;
    
    async function checkClassId(finalName) {
        try {
            const connection = await pool.getConnection();
            const [rows] = await connection.execute(
                `SELECT 
                    class_id
                FROM 
                    academy_classes
                WHERE
                    class_id = ?`, 
                [finalName]
            );
            connection.release();
            return rows;
        } catch (error) {
            throw error;
        }
    }
    const rows = checkClassId(finalName)
      if(rows.length > 0) {
        console.log(`Class ID already exists`)
      } else {
        console.log(`Class ID is available`)
        return finalName;
      }
    return rows;
};