// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OrderStatus = {
  "NEW": "NEW",
  "COOKING": "COOKING",
  "PICKED_UP": "PICKED_UP",
  "COMPLETED": "COMPLETED",
  "READY_FOR_PICKUP": "READY_FOR_PICKUP"
};

const { Address, Basket, BasketDish, Dish, OrderDish, Order, Restaurant, User } = initSchema(schema);

export {
  Address,
  Basket,
  BasketDish,
  Dish,
  OrderDish,
  Order,
  Restaurant,
  User,
  OrderStatus
};