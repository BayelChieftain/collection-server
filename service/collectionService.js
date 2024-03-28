import ApiError from '../exceptions/apiError.js';
import { Collection } from '../models/collectionModel.js';
import { User } from '../models/userModel.js';

class CollectionService {
  async createCollection(name, description, category, imageUrl, fields, owner) {
    try {  
          const user = await User.findById(owner);
          if (!user) {
            throw ApiError.BadRequest('User not found');
          }
        const collection = await Collection.create({ name, description, category, imageUrl, fields, owner });
        return collection;
      } catch (error) {
        throw error;
      }
  }

  async updateCollection(collectionId, updatedFields) {
    try {
        const collection = await Collection.findByIdAndUpdate(collectionId, updatedFields, { new: true });
        if (!collection) {
          throw ApiError.BadRequest('Collection not found');
        }
        return collection;
      } catch (error) {
        throw error;
      }
  }

  async deleteCollection(collectionId) {
    try {
        const collection = await Collection.findByIdAndDelete(collectionId);
        if (!collection) {
          throw ApiError.BadRequest('Collection not found');
        }
        return collection;
      } catch (error) {
        throw error;
      }
  }

  async getCollections() {
    try {
        const collections = await Collection.find();
        const sortedCollections = collections.sort((a, b) => b.fields.length - a.fields.length);
        const largestCollections = sortedCollections.slice(0, 5);
        return largestCollections
      } catch (error) {
        throw error;
      }
  }

  async getCollectionById(collectionId) {
    try {
        const collection = await Collection.findById(collectionId);
        if (!collection) {
          throw ApiError.BadRequest('Collection not found');
        }
        return collection;
      } catch (error) {
        throw error;
      }
  }

  async getCollectionByOwner(userId) {
    try {
      const collections = await Collection.find({ owner: userId });
      return collections;
    } catch (error) {
      throw error
    }
  }
}

export const collectionService = new CollectionService();
