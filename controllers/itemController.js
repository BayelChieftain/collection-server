import { validationResult } from 'express-validator';
import ApiError from '../exceptions/apiError.js';
import { itemService } from '../service/itemService.js';

class ItemController {
  async createItem(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Error during validation', errors.array()));
      }
      const { name, tags, collectionRef, dynamicFields, imageUrl = null } = req.body;
      const item = await itemService.createItem(name, tags, collectionRef, dynamicFields, imageUrl);
      return res.json(item);
    } catch (error) {
      next(error);
    }
  }

  async updateItem(req, res, next) {
    try {
      const { itemId } = req.params;
      const { name, tags, collectionRef, dynamicFields } = req.body;
      const updatedItem = await itemService.updateItem(itemId, { name, tags, collectionRef, dynamicFields });
      return res.json(updatedItem);
    } catch (error) {
      next(error);
    }
  }

  async deleteItem(req, res, next) {
    try {
      const { itemId } = req.params;
      const deletedItem = await itemService.deleteItem(itemId);
      return res.json(deletedItem);
    } catch (error) {
      next(error);
    }
  }

  async getItemsInCollection(req, res, next) {
    try {
      const { collectionId } = req.params;
      const items = await itemService.getItemsInCollection(collectionId);
      return res.json(items);
    } catch (error) {
      next(error);
    }
  }

  async getItemById(req, res, next) {
    try {
      const { itemId } = req.params;
      const item = await itemService.getItemById(itemId);
      return res.json(item);
    } catch (error) {
      next(error);
    }
  }

  async getItems(req, res, next) {
    try {
      const items = await itemService.getAllItems()
      return res.json(items)
    } catch (e) {
      next(e)
    }
  }
}

export const itemController = new ItemController();
