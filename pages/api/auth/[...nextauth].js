
import moment from "moment/moment";
import NextAuth from "next-auth/next";
import CredentialsProvider  from "next-auth/providers/credentials";
import { redirect } from "next/dist/server/api-utils";
import { generateToken } from "src/lib/generate.Token";

export default NextAuth({
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "my-project",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                let data = {
                    error: false,
                    data: {
                        id:1,
                        email: "example@example.com",
                        avatars: "http://domain.com/url-images"
                    }
                }
                const token = await
                generateToken(
                    data?.data,
                    "1d"
                )
                Reflect.set(
                    data,
                    'token',
                    token
                )
                
                return {
                    ... data
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        maxAge:20,
        secret: process.env.NEXTAUTH_SECRET
    },
    session: {
        maxAge: 20,
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            return baseUrl;
        },
        async signIn({
            account, profile, user, credentials
        }) {
            switch (account?.provider) {
                case "credentials":
                    return user?.error === false;
                default:
                    return false;
            }
        },

        async jwt({
            token, user, profile, account
        }) {
            user && (token.user = {
                ... user,
                bearer_token: token?.user?.token ?? null,
                id: token?.user?.id ?? null,
                email: token?.user?.email ?? null
            }); {
                user &&(
                    token.user = {
                        ...user,
                        bearer_token: token?.user?.token ?? null,
                        id: token?.user?.id ?? null,
                        email: token?.user?.email ?? null
                    }

                );
                user && (
                    token.accessToken = user?.token
                );
                profile && (token.profile = profile)
                account && (
                    token.account = account
                )
            }
            return {
                ...token
            }
        },

        async session({
            session, token, user, profile
        }) {
            if (Date.now() > moment(session?.expires)) {
                return null;
            }
            session.user = token?.user
            session.profile = token?.profile ?? null
            session.account = token?.account ?? null
            session.data = token?.data ?? null
         
            return session
        },
        debug: true
    }
});


// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";


// export default NextAuth({
//     providers:[
//         CredentialsProvider({
//             id:'credentials',
//             name:'my-projects',
//             credentials:{
//                 email:{
//                     label:'email',
//                     type:'my-projects',
//                     credentials:{
//                         email:{label:'email'},
//                         password:{label:'password'}
//                     },
//                     async authorize(credentials,req){
//                         let data = {
//                             error:false,
//                             data:{
//                                 id:1,
//                                 email:"example@example.com",
//                                 avatars:'http://domain.com/url-iamges'
//                             }
//                         }

//                         return{
//                             ...data
//                         }
//                     }
//                 }
//             }
//         })
//     ],
//     secret: process.env.SECRET,
//     jwr:{
//         maxAge: 20,
//         secret: process.env.SECRET
//     },
//     session:{
//         maxAge: 20,
//         strategy: 'jwt'
//     },
//     pages:{
//         signIn:'/auth/login'
//     },
//     callbacks:{
//         async redirect({url,baseUrl}){
//             return baseUrl
//         },
//         async signIn({account,profile,user,credentials}){
//             switch (account?.Provider){
//                 case "credentials":
//                     return true
//                 default:
//                     return false;
//             }
//         },
//         async jwt ({
//             token,
//             user,
//             profile,
//             account,
//         }){
//             user &&(
//                 token.user = {
//                     user,
//                     bearer_token: token?.user?.token ?? null,
//                     id: token?.user?.id ?? null,
//                     email: token?.user?.email ?? null,

//                 }
//             );
//             return {
//                 ...token,
//             }
//         },
//         async session({
//             session,
//             token,
//             user,
//             profile
//         }){
//             if(Date.now() > moment(session?.expires)) {
//                 return null;
//             }
//             Reflect.set(session,'data',token??null)

//             return session;

//         }
//     },
//     debug: true
// })