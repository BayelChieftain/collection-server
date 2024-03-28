import ApiError from '../exceptions/apiError.js';
import { Collection, Item } from '../models/collectionModel.js';

class ItemService {
  async createItem(name, tags, collectionRef, dynamicFields, imageUrl) {
    try {
      const collection = await Collection.findById(collectionRef);
      if (!collection) {
        throw ApiError.BadRequest('Collection not found');
      }
      const item = await Item.create({ name, tags, collectionRef, dynamicFields, imageUrl });
      return item;
    } catch (error) {
      throw error;
    }
  }

  async updateItem(itemId, updatedFields) {
    try {
      const item = await Item.findByIdAndUpdate(itemId, updatedFields, { new: true });
      if (!item) {
        throw ApiError.BadRequest('Item not found');
      }
      return item;
    } catch (error) {
      throw error;
    }
  }

  async deleteItem(itemId) {
    try {
      const item = await Item.findByIdAndDelete(itemId);
      if (!item) {
        throw ApiError.BadRequest('Item not found');
      }
      return item;
    } catch (error) {
      throw error;
    }
  }

  async getItemsInCollection(collectionId) {
    try {
      const items = await Item.find({ collectionRef: collectionId });
      return items;
    } catch (error) {
      throw error;
    }
  }

  async getItemById(itemId) {
    try {
      const item = await Item.findById(itemId);
      if (!item) {
        throw ApiError.BadRequest('Item not found');
      }
      return item;
    } catch (error) {
      throw error;
    }
  }

  async getAllItems() {
   try {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    const items = await Item.find({
      createdAt: { $gte: startDate, $lte: endDate }
    });
    return items;
   } catch (er) {
     throw er
   }
  }
}


export const itemService = new ItemService();
