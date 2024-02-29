import { pool } from '../data/database2.js';
import { createClassId } from './createClassId.js';
import { classRegistration } from './classRegistration.js';

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
          c.class_cost,
          c.class_registration,
          c.class_enrollment_link,
          c.class_featured,
          c.class_term,
          c.class_audience,
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
          c.class_id = ?
          AND c.class_status != 'DELETED'`, [classId]
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
          c.class_cost,
          c.class_registration,
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
          persons p ON ci.person_id = p.person_id
          WHERE 
          c.class_status != 'DELETED'`
      );
      connection.release();
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async getFeaturedClasses() {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.execute(
        `SELECT 
          c.class_id,
          c.class_name,
          c.class_description,
          c.class_term,
          c.class_cost,
          c.class_registration,
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
          persons p ON ci.person_id = p.person_id
          WHERE 
          c.class_status != 'DELETED'
          AND c.class_featured = 'TRUE'`
      );
      connection.release();
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async addNewClass(newClassData) {
    try {
        const class_name = newClassData.className;
        const class_description = newClassData.classDescription;
        const class_term = newClassData.classTerm;
        const class_locations = newClassData.classLocation;
        const class_audience = newClassData.classAudience;
        const class_enrollment_link = newClassData.classLink;
        const class_created_by = newClassData.classCreatedBy;
        const class_updated = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const class_cost = newClassData.classCost;
        const class_registration = 1 //(newClassData.Registration);
        console.log(class_name, class_description, class_term, class_locations, class_audience, class_enrollment_link, class_created_by, class_updated, class_cost, class_registration)

        const class_id = createClassId(class_term, class_name);
        const person_id = newClassData.classInstructor;

        console.log(class_name, class_description, class_term, class_locations, class_audience, class_enrollment_link, class_created_by, class_updated, class_cost, class_registration, class_id)
        const insertClassQuery = `
            INSERT INTO academy_classes
                (class_name, class_description, class_term, class_locations, class_audience, class_enrollment_link, class_created_by, class_updated, class_cost, class_registration, class_id) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const insertInstructorQuery = `
            INSERT INTO class_instructors (class_id, person_id) 
            VALUES (?, ?)`;

        const connection = await pool.getConnection();
        await connection.execute(insertClassQuery, [
            class_name, class_description, class_term, class_locations, class_audience,
            class_enrollment_link, class_created_by, class_updated, class_cost, class_registration, class_id
        ]);

        await connection.execute(insertInstructorQuery, [class_id, person_id]);

        connection.release();
        return { message: 'Class added successfully' };
    } catch (error) {
        console.error('Error adding new class:', error);
        throw error;
    }
}


//   async getSelectOptions() {
//       // SQL query to fetch all items from the locations table
//     const locationsQuery = 'SELECT * FROM locations';
//     // SQL query to fetch all items from the instructors table
//     const instructorsQuery = 'SELECT * FROM instructors';

//   // Execute both queries in parallel
//   connection.query(locationsQuery, (err, locationsResult) => {
//     if (err) {
//       console.error('Error fetching data from locations table:', err);
//       res.status(500).json({ error: 'Internal server error' });
//       return;
//     }

//     connection.query(instructorsQuery, (err, instructorsResult) => {
//       if (err) {
//         console.error('Error fetching data from instructors table:', err);
//         res.status(500).json({ error: 'Internal server error' });
//         return;
//       }

//       // Combine the results into a single object
//       const data = {
//         locations: locationsResult,
//         instructors: instructorsResult
//       };

//       // Send the combined data as a JSON response
//       res.json(data);
//     });
//   });
// }
}

export default ClassModel;