
import {roles} from '../../middleware/Auth.js'

export const endPoint = {
    create:[roles.Admin],
    getAlls:[roles.Admin,roles.User],
    getActive:[roles.User],
    update:[roles.Admin],
    specific:[roles.Admin,roles.User]
}