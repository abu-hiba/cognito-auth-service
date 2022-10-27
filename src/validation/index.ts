import { validateRequestBody, validateRequestQuery } from "./validationMiddleware"
import * as validationFunctions from "./validationFunctions"

export {
    validateRequestBody,
    validateRequestQuery,
} 

export default {
    ...validationFunctions
}
