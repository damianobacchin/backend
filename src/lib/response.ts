import { Lang } from '../config/enums/Lang.enum'
import { ResponseMessage } from '../config/enums/Response.enum'

import it from '../lang/it.json'
import en from '../lang/en.json'

export const response = (message: ResponseMessage, lang?: Lang) => {
    let response: string
    switch (lang) {
        case Lang.IT:
            response = it[message]
            break
        case Lang.EN:
            response = en[message]
            break
        default:
            response = en[message]
            break
    }
    return response
}