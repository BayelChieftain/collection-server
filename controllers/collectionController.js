import { validationResult } from 'express-validator';
import { collectionService } from '../service/collectionService.js';
import ApiError from '../exceptions/apiError.js';

class CollectionController {
  async createCollection(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Error during validation', errors.array()));
      }
      const { name, description, category, fields, imageUrl = '', owner } = req.body;
      const collection = await collectionService.createCollection(name, description, category, imageUrl, fields, owner);
      return res.json(collection);
    } catch (error) {
      next(error);
    }
  }

  async updateCollection(req, res, next) {
    try {
      const { collectionId } = req.params;
      const { name, description, category, imageUrl, fields, owner } = req.body;
      const updatedCollection = await collectionService.updateCollection(collectionId, { name, description, category, imageUrl, fields, owner });
      return res.json(updatedCollection);
    } catch (error) {
      next(error);
    }
  }

  async deleteCollection(req, res, next) {
    try {
      const { collectionId } = req.params;
      const deletedCollection = await collectionService.deleteCollection(collectionId);
      return res.json(deletedCollection);
    } catch (error) {
      next(error);
    }
  }

  async getCollections(req, res, next) {
    try {
      const largestCollections = await collectionService.getCollections();
      return res.json(largestCollections);
    } catch (error) {
      next(error);
    }
  }

  async getCollectionById(req, res, next) {
    try {
      const { collectionId } = req.params;
      const collection = await collectionService.getCollectionById(collectionId);
      return res.json(collection);
    } catch (error) {
      next(error);
    }
  }

  async getCollectionByOwner(req, res, next) {
    try {
        const { userId } = req.params;
        const collections = await collectionService.getCollectionByOwner(userId);
        return res.json(collections)
    } catch (error) {
      next(error)
    }
  }

  async uploadImage(req, res, next) {
    try {
      if (!req.file) {
        return res.status(200).send('Image uploaded successfully.');
      }
      
     // const imageUrl = `${req.protocol}://${req.hostname}/${req.file.path.replace(/\\/g, '/')}`; // for hosting
     const imageUrl = `${req.protocol}://${req.get('host')}/${req.file.path.replace(/\\/g, '/')}`; // for develop
  
      return res.json(imageUrl);
    } catch (error) {
      next(error);
    }
  }
}

export const collectionController = new CollectionController();

