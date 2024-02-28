//API Router
import express from 'express';
import ApiService from '../services/apiService.js'; // Changed the name of the imported service

const apiRouter = express.Router();
const apiService = new ApiService(); // Use a different name for the variable


// GET /classes
apiRouter.get('/', async (req, res) => {
  console.log(`received request for locations`)
  try {
    const optionsData = await apiService.getAllLocations();
    if (optionsData.length === 0) {
      return res.status(404).json({ message: 'No locations found' });
    }
    res.json(optionsData);
  } catch (error) {
    console.error('Error retrieving locations data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

apiRouter.get('/persons', async (req, res) => {
    console.log(`received request for persons`)
    try {
      const optionsData = await apiService.getAllPeople();
      if (optionsData.length === 0) {
        return res.status(404).json({ message: 'No locations found' });
      }
      res.json(optionsData);
    } catch (error) {
      console.error('Error retrieving locations data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  apiRouter.get('/form_data', async (req, res) => {
    const form_data = {};
    console.log(`received request for all form data`)
    try {
      const optionsData = await apiService.getAllPeople();
      if (optionsData.length === 0) {
        return res.status(404).json({ message: 'No locations found' });
      }
      form_data.persons_data = optionsData;
    } catch (error) {
      console.error('Error retrieving locations data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }

    try {
        const optionsData = await apiService.getAllLocations();
        if (optionsData.length === 0) {
          return res.status(404).json({ message: 'No locations found' });
        }
        form_data.locations_data = optionsData;
      } catch (error) {
        console.error('Error retrieving locations data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

    try {
        const optionsData = await apiService.getAllTerms();
        if (optionsData.length === 0) {
          return res.status(404).json({ message: 'No locations found' });
        }
        form_data.terms_data = optionsData;
      } catch (error) {
        console.error('Error retrieving locations data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

    try {
        const optionsData = await apiService.getAllStatuses();
        if (optionsData.length === 0) {
          return res.status(404).json({ message: 'No locations found' });
        }
        form_data.status_data = optionsData;
      } catch (error) {
        console.error('Error retrieving locations data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

    try {
        const optionsData = await apiService.getAllAudiences();
        if (optionsData.length === 0) {
          return res.status(404).json({ message: 'No locations found' });
        }
        form_data.audience_data = optionsData;
      } catch (error) {
        console.error('Error retrieving locations data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

    res.json(form_data);
  });

export default apiRouter;
