import { pool } from '../data/database2.js';
import { createClassId } from './createClassId.js';
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
          persons p ON ci.person_id = p.person_id`
      );
      connection.release();
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async addNewClass(newClassData) {
    const class_name = newClassData.className;
    const class_description = newClassData.classDescription
    const class_term = newClassData.classTerm
    const class_locations = newClassData.classLocations
    const class_audience = newClassData.classAudience
    const class_enrollment_link = newClassData.classEnrollmentLink
    const class_created_by = newClassData.classCreatedBy
    const class_updated = newClassData.classUpdated
    const class_cost = newClassData.classCost
    const class_registration = newClassData.classRegistration
    const class_id = createClassId(class_term, class_name);

    const insertClassQuery = `INSERT INTO academy_classes
                              (class_name, class_description, class_term, class_locations, class_audience, class_enrollment_link, class_created_by, class_updated, class_cost, class_registration) 
                              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    console.log(class_id);

    // const connection = await pool.getConnection();
    // connection.query(insertClassQuery, [class_name, class_description, class_term, class_locations, class_audience, class_enrollment_link, class_created_by, class_updated, class_cost, class_registration], (error, results) => {
    //   if (error) {
    //     console.error('Error inserting class:', error);
    //     res.status(500).json({ error: 'Error inserting class' });
    //     return;
    //   }
  
    //   const classId = results.insertId;
  
    //   const insertInstructorQuery = `INSERT INTO class_instructors (class_id, person_id) VALUES (?, ?)`;
    //   connection.query(insertInstructorQuery, [classId, person_id], (instructorError) => {
    //     if (instructorError) {
    //       console.error('Error inserting instructor:', instructorError);
    //       res.status(500).json({ error: 'Error inserting instructor' });
    //       return;
    //     }
  
    //     res.status(201).json({ message: 'Class added successfully' });
    //   });
    // });
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