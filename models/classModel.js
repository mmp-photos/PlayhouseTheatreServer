import { pool } from '../data/database2.js';
import { createClassId } from './createClassId.js';
import { classRegistration } from './classRegistration.js';

class ClassModel {
  async getClassById(classId) {
    console.log(classId)
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
          c.class_enrollment_link,
          c.class_featured,
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

  async getAllClassData() {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.execute(
        `SELECT 
              ac.*,
              l.location_id,
              l.location_name,
              ct.term_id,
              ct.term_name,
              ct.start_date,
              ct.end_date,
              ct.current_term,
              ca.audience_id,
              ca.audience_description,
              p.person_id,
              p.person_name,
              p.person_photo,
              p.person_title
          FROM 
              academy_classes AS ac
          JOIN 
              locations AS l ON ac.class_locations = l.location_id
          JOIN 
              class_terms AS ct ON ac.class_term = ct.term_id
          JOIN 
              class_audience AS ca ON ac.class_audience = ca.audience_id
          JOIN 
              class_instructors AS ci ON ac.class_id = ci.class_id
          JOIN 
              persons AS p ON ci.person_id = p.person_id
          WHERE 
              ac.class_status = 'LIVE'
          ORDER BY 
              ac.class_term, ac.class_name;
        `
      );
      connection.release();
      return rows;
    } catch (error) {
      throw error;
    }        
  }
  async getAllClassesByLocation() {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.execute(
        `SELECT 
              ac.*,
              l.location_id,
              l.location_name,
              ct.term_id,
              ct.term_name,
              ct.start_date,
              ct.end_date,
              ct.current_term,
              ca.audience_id,
              ca.audience_description,
              p.person_id,
              p.person_name,
              p.person_photo,
              p.person_title
          FROM 
              academy_classes AS ac
          JOIN 
              locations AS l ON ac.class_locations = l.location_id
          JOIN 
              class_terms AS ct ON ac.class_term = ct.term_id
          JOIN 
              class_audience AS ca ON ac.class_audience = ca.audience_id
          JOIN 
              class_instructors AS ci ON ac.class_id = ci.class_id
          JOIN 
              persons AS p ON ci.person_id = p.person_id
          WHERE 
              ac.class_status = 'LIVE'
          ORDER BY 
              l.location_name, ac.class_name;
        `
      );
      connection.release();
      return rows;
    } catch (error) {
      throw error;
    }        
  }

  async getAllClassesByAge() {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.execute(
        `SELECT 
              ac.*,
              l.location_id,
              l.location_name,
              ct.term_id,
              ct.term_name,
              ct.start_date,
              ct.end_date,
              ct.current_term,
              ca.audience_id,
              ca.audience_description,
              p.person_id,
              p.person_name,
              p.person_photo,
              p.person_title
          FROM 
              academy_classes AS ac
          JOIN 
              locations AS l ON ac.class_locations = l.location_id
          JOIN 
              class_terms AS ct ON ac.class_term = ct.term_id
          JOIN 
              class_audience AS ca ON ac.class_audience = ca.audience_id
          JOIN 
              class_instructors AS ci ON ac.class_id = ci.class_id
          JOIN 
              persons AS p ON ci.person_id = p.person_id
          WHERE 
              ac.class_status = 'LIVE'
          ORDER BY 
              ca.audience_description, ac.class_name DESC;
        `
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
          c.class_audience,
          c.class_enrollment_link,
          c.class_cost,
          c.class_registration,
          c.class_locations,
          l.location_id,
          l.location_name,
          l.address_1,
          l.address_2,
          l.city,
          l.state,
          l.zip,
          l.parking,
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

  async updateClassDetails(classUpdates) {
    const classId = classId;
    const className = classUpdates.className;
    const classCost = classUpdates.classCost;
    const classRegistration = classUpdates.class_registration;
    const classDescription = classUpdates.class_description;
    const classTerm = classUpdates.class_term;
    const classAudience = classUpdates.class_audience;
    const classLink = classUpdates.class_link;
    const classFeatured = classUpdates.class_featured;
    const classLocation = classUpdates.class_locations;
    const classInstructor = classUpdates.class_instructor;
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
          return;
        }

        // Begin transaction
        connection.beginTransaction(err => {
          if (err) {
            connection.release();
            reject(err);
            return;
          }

          // Update academy_classes table
          connection.query('UPDATE academy_classes SET class_name = ?, class_cost = ?, class_registration = ?, class_description = ?, class_term = ?, class_audience = ?, class_link = ?, class_createdBy = ?, class_featured = ?, class_location = ? WHERE class_id = ?', 
          [className, classCost, classRegistration, classDescription, classTerm, classAudience, classLink, classCreatedBy, classFeatured, classLocation, classId], 
          (err, result) => {
            if (err) {
              connection.rollback(() => {
                connection.release();
                reject(err);
              });
              return;
            }

          // Update classes_instructor table
          connection.query('UPDATE classes_instructor SET instructorId = ? WHERE classId = ?', 
          [classInstructor, classId], 
          (err, result) => {
            if (err) {
              connection.rollback(() => {
                connection.release();
                reject(err);
              });
              return;
            }

            // Commit transaction
            connection.commit(err => {
              if (err) {
                connection.rollback(() => {
                  connection.release();
                  reject(err);
                });
                return;
              }
              connection.release();
              resolve();
            });
          });
        });
      });
    });
  })
  }
};

export default ClassModel;