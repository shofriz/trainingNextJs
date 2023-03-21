import React from 'react'

export default function SSR(props) {
    let { data } = props
    
    return (
        <div>
            <h1>Server Side Rendering</h1>
            <p>Simulasi Server Side Rendering di nextjs </p>

            <div>
                {
                     data.map((item) => {
                        return (
                            <div key={item.id} className="bg-gray-80 px-4 py-8">
                                <h1 class={'text-red-500'}> User Id: {item.userId}</h1>
                                <h1 class={'text-green-500'}> Id: {item.title}</h1>
                                <h1  className="text-1xl text-blue-500 text-lg  "> Title: {item.body}</h1>
                               
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export async function getServerSideProps(context){
    let data = [] 
    await fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response)=> response.json())
    .then((response)=> {
        data = response
        })
        .catch((err)=>{
            console.log(err)
        })

    return{
        props: {
            data: data
            
        }
    }
}