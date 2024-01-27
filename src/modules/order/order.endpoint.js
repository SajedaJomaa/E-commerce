import {roles} from '../../middleware/Auth.js';

export const endPoint = {
    create:[roles.User],
  }