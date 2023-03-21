export default function ProductDetail(props){
    props?.Id
    return (
        <div>
            <h1>Product Detail  {props?.Id}  </h1>
        </div>
    )
}

export async function getServerSideProps(context){
    let  { Id } = context.params
    context.params?.Id
    
    return{
        props: {
            Id
        }
    }
}