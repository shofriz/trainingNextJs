import nc from 'next-connect'
import ErrorHandler from '@/src/handler/error.handler'
import { ProductValidator } from '@/src/validator';

const handler = nc(ErrorHandler);


handler
.post (
    ProductValidator.create,
    async (req, res) => {
    return res.status(200)
    .json(req.body)
})
    

.get( async(req, res) => {
   const [err, data] = await fetch('https://jsonplaceholder.typicode.com/posts')
   .then((res )=> res.json())
   .then((result) => {
       return[null, result]
      })
   .catch((err)=>{
      return [err, null]
   })

   if(err){
       return res.status(400).json({
           error: true,
           message: "Ada Error Nih",
           data: null
       })
   }
   return res.status(200).json(data)
})

export default handler
