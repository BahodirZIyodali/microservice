import * as jwt from 'jsonwebtoken'
import { JWT_EXPIRE_ACCESS, JWT_EXPIRE_REFRESH } from '@constants'


export const verify = (payload: string): string => JSON.stringify(jwt.verify(payload, 'dsadas'))

export const sign = (payload: object): string => jwt.sign(payload, '1q2w3e4r', {
    expiresIn: JWT_EXPIRE_ACCESS
})
export const refreshSign = (payload: object): string => jwt.sign(payload, '1q2w3e4r', {
    expiresIn: JWT_EXPIRE_REFRESH
})