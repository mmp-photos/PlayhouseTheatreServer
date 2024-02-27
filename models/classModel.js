import { pool } from '../data/database2.js';

class ClassModel {
  async getClassById(classId) {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.execute(
        `SELECT 
          c.class_id,
          c.class_name,
          c.class_description,
          c.class_term,
          c.class_locations,
          l.location_id,
          l.location_name,
          l.address_1,
          p.person_id,
          p.person_name AS instructor_name
        FROM 
          academy_classes c
        LEFT JOIN 
          locations l ON c.class_locations = l.location_id
        LEFT JOIN 
          class_instructors ci ON c.class_id = ci.class_id
        LEFT JOIN 
          persons p ON ci.person_id = p.person_id
        WHERE
          c.class_id = ?`, [classId]
      );
      connection.release();
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async getAllClasses() {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.execute(
        `SELECT 
          c.class_id,
          c.class_name,
          c.class_description,
          c.class_term,
          c.class_locations,
          l.location_id,
          l.location_name,
          l.address_1,
          p.person_id,
          p.person_name AS instructor_name,
          p.person_photo
        FROM 
          academy_classes c
        LEFT JOIN 
          locations l ON c.class_locations = l.location_id
        LEFT JOIN 
          class_instructors ci ON c.class_id = ci.class_id
        LEFT JOIN 
          persons p ON ci.person_id = p.person_id`
      );
      connection.release();
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

export default ClassModel;

// export default ClassModel;
// class ClassModel {

//   async getClassById(classId) {
//     console.log(`Select class by ID`)
//     const connection = await pool.getConnection();
//     try {
//       const [rows] = await connection.execute(
//         `SELECT 
//           c.class_id,
//           c.class_name,
//           c.class_description,
//           c.class_term,
//           c.class_locations,
//           l.location_id,
//           l.location_name,
//           l.address_1,
//           p.person_id,
//           p.person_name AS instructor_name
//         FROM 
//           academy_classes c
//         LEFT JOIN 
//           locations l ON c.class_locations = l.location_id
//         LEFT JOIN 
//           class_instructors ci ON c.class_id = ci.class_id
//         LEFT JOIN 
//           persons p ON ci.person_id = p.person_id
//         WHERE
//           c.class_id = ?`, [classId]
//       );
//       console.log(rows)

//       return rows;
//     } catch (error) {
//       throw error;
//     } finally {
//       connection.release();
//     }
//   }

//   async getAllClasses() {
//     console.log(`Select all classes`)
//     const connection = await pool.getConnection();
//     try {
//       const [rows] = await connection.execute(
//         `SELECT 
//           c.class_id,
//           c.class_name,
//           c.class_description,
//           c.class_term,
//           c.class_locations,
//           l.location_id,
//           l.location_name,
//           l.address_1,
//           p.person_id,
//           p.person_name AS instructor_name,
//           p.person_photo
//         FROM 
//           academy_classes c
//         LEFT JOIN 
//           locations l ON c.class_locations = l.location_id
//         LEFT JOIN 
//           class_instructors ci ON c.class_id = ci.class_id
//         LEFT JOIN 
//           persons p ON ci.person_id = p.person_id`
//       );
//       console.log(rows)
//       return rows;
//     } catch (error) {
//       throw error;
//     } finally {
//       connection.release();
//     }
//   }
// }

// export default ClassModel;
