import '@/src/assets/sass/main.scss'
import "@/src/assets/dist/styles.css"
import { useRouter } from 'next/router'
import ProductLayout from '@/src/components/product.layout'
import { SessionProvider,getSession } from 'next-auth/react'

function AppSwitchTheme({children}){
  const router = useRouter()
  if(router.asPath.startsWith('/product')){
    return (
      <ProductLayout>
        {children}
      </ProductLayout>
    )
  }else{
    return children
  }
}

function AppSwitchTheme2 ({children}){
  const router = useRouter()
  if(router.asPath.startsWith('/product')){
    return (
      <ProductLayout>
        {children}
      </ProductLayout>
    )
  }else{
    return children
  }
}
//Happy birthday Softriezss ,God Bless and Allah Does

function App(props) {
  let {
    Component,
    pageProps:{
      session,
      ...pageProps
    }
  }=props


  console.log(props,"shshsh")
  return (
        <SessionProvider session={session}>
          <AppSwitchTheme>
            <Component {...pageProps} />
          </AppSwitchTheme>
        </SessionProvider>

  )
}

App.getInitialProps = async ({Component, ctx}) => {
  let pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
  const session = await getSession(ctx)
  pageProps = {
    ...pageProps,
    session
  }

  return {pageProps}
}

export default App