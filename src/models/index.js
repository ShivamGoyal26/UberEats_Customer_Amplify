// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OrderStatus = {
  "NEW": "NEW",
  "COOKING": "COOKING",
  "READY_FOR_PICKUP": "READY_FOR_PICKUP",
  "PICKED_UP": "PICKED_UP",
  "COMPLETED": "COMPLETED",
  "CANCELLED": "CANCELLED"
};

const { Basket, BasketDish, Dish, OrderDish, Order, Restaurant, Address, User } = initSchema(schema);

export {
  Basket,
  BasketDish,
  Dish,
  OrderDish,
  Order,
  Restaurant,
  Address,
  User,
  OrderStatus
};