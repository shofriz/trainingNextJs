import { useState,useEffect } from 'react'


export default function ProductList() {
    const [visible, setVisible] = useState(false)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch('http://localhost:3000/api/product')
            .then(res => res.json())
            .then((result) => {
                setTimeout (() => {
                setData(result)
                console.log(result)
                setLoading(false)
                }, 3000)
                clearTimeout()
            } 
            )
            .catch((err)=>{
                setLoading(false)
            })
    }, [ visible ])
    console.log(loading,'Loading')
    return (
        <div>
            <h1>Product List</h1>
            {
                loading ? <h1>Loading...</h1> :
                Array.isArray(data) &&
                data.length > 0 &&
                data.map((item) => {
                    return (
                        <div key={item.id} className="max-w-screen-lg mx-auto mt-8">
                            <h1 class={'text-red-500'}> UserId: {item.userId}</h1>
                            <h1 class={'text-green-500'}> Id: {item.title}</h1>
                            <h1  className="text-1xl text-blue-500 "> Title: {item.body}</h1>
                           
                        </div>
                    )
                })
            }
            <button onClick={() => setVisible(!visible)}>Toggle</button>
        </div>
    )
}
