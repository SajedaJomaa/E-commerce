import {roles} from '../../middleware/Auth.js'


export const endPoint = {
    create: [roles.User],
    delete: [roles.User],
    clear: [roles.User],
    get: [roles.User]
}