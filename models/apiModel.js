import { pool } from '../data/database2.js';

class apiModel {
    async getAllLocations() {
        try {
          const connection = await pool.getConnection();
          const [rows] = await connection.execute(
            'SELECT * FROM locations'
          );
          connection.release();
          return rows;
        } catch (error) {
          throw error;
        }
    }
    async getAllPeople() {
        try {
          const connection = await pool.getConnection();
          const [rows] = await connection.execute(
            'SELECT * FROM persons'
          );
          connection.release();
          return rows;
        } catch (error) {
          throw error;
        }
    }
    async getAllTerms() {
        try {
          const connection = await pool.getConnection();
          const [rows] = await connection.execute(
            'SELECT * FROM class_terms'
          );
          connection.release();
          return rows;
        } catch (error) {
          throw error;
        }
    }
    async getAllStatuses() {
        try {
          const connection = await pool.getConnection();
          const [rows] = await connection.execute(
            'SELECT * FROM status'
          );
          connection.release();
          return rows;
        } catch (error) {
          throw error;
        }
    }
    async getAllAudiences() {
        try {
          const connection = await pool.getConnection();
          const [rows] = await connection.execute(
            'SELECT * FROM class_audience'
          );
          connection.release();
          return rows;
        } catch (error) {
          throw error;
        }
    }
}

export default apiModel;