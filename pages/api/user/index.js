import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import ErrorHandler from '@/src/handler/error.handler';
import UserController from '@/src/controller/user.controller';
import { isNumber } from 'lodash';

const handler = nc(ErrorHandler);

handler.post(async (req, res) => {
    let inputDTO = req.body;

    //check email
    let salt = bcrypt.genSaltSync(10);
    let hashpassword = bcrypt.hashSync(inputDTO.password, salt);
    Reflect.set(inputDTO, 'password' , hashpassword);
    Reflect.set(inputDTO, 'salt' , salt);

    //create user Baru
    const [err, data] = await  new UserController({
        fields: inputDTO
    }).create();

    if(err){
        res.status(400).json({
            message: err.message ?? "Error: Something went wrong"
        })
    } 

    Reflect.deleteProperty(inputDTO, 'password');
    Reflect.deleteProperty(inputDTO, 'salt');

    res.status(200).json({
        message: 'success',
        data:data,


});
});
handler.delete (async (req, res) => {
    let inputDTO = req.body;

    //delete user
    const [err, data] = await  new UserController({
        key: inputDTO.key ?? 'id',
        value: isNumber(inputDTO?.value) ? Number(inputDTO?.value) : inputDTO?.value ?? null
    }).delete();

    if(err){
        res.status(400).json({
            message: err.message ?? "Error: Bad Request"
        })
    }

    res.status(200).json({
        message: 'success',
        data:data,
    });
}

);

export default handler