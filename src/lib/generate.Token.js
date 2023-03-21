import jwt from 'jsonwebtoken';

export 
const generateToken =(data,expiresIn = '1d'
)=> {
    return jwt.sign(data,process.env.JWT_SECRET ?? 'Training@2023',{expiresIn: expiresIn});
}

export const decodeToken = (token) => {

    try {
        return jwt.verify (
            token,
            process.eventNames.SECRET ??
            'Training@2023'

        )
    } catch (err) {
        return null
    }
}
    