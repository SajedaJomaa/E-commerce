import {roles} from '../../middleware/Auth.js';

export const endPoint = {
    create:[roles.Admin],
    getAlls:[roles.Admin],
    getActive:[roles.User],
    update:[roles.Admin],
    specific:[roles.Admin,roles.User]
}