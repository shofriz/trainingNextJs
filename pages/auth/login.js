import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router'

export default function Login() {
    const Router = useRouter()
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .max(30,'must be 30 characters or less')
                .email("Invalid email address")
                .required("Required"),
            password: Yup.string()
                .min(5, "Must be 5 characters or more")
                .max(20, "Must be 20 characters or less")
                .required("Required"),
        }),
        onSubmit:async (values) => {
            //call service or API
            console.log(values);
            const Credentials = await signIn(
                 'credentials',
                 {
                    email: values?.email,
                    password: values?.password,
                    redirect: false,
                }
            )
            if(Credentials.ok){
                Router.push(
                    '/'
                )
            }

            console.log(Credentials);
        }
    });
    return(
        <div className="w-full bg-gray-600 h-screen flex items-center justify-center" >
            <div className="w-1/3 bg-white rounded-lg shadow-xl p-6">
                <form onSubmit={formik.handleSubmit} className={'flex flex-col space-x-0'}>
                    <label htmlFor="email" className="w-full my-4 flex flex-col font-mono uppercase font-bold  text-[14.5px]  space-y4">
                        <span>Email</span>
                        <input type="email" 
                        className="h-8 text-10  bg-gray-50 border py-55-rem border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        name={'email'} 
                        value={formik?.values?.email}
                        onChange={formik.handleChange}
                        placeholder={'input your email'}/>
                        {
                            formik.errors &&
                            formik.errors.email &&
                            formik.touched &&
                            formik.touched.email &&
                            (
                                <span className={'!text-red-500 !text-xs'}>{formik.errors?.email}</span>
                            )
                        }
                    </label>
                    <label htmlFor="password" className="w-full my-4 flex flex-col space-y4 font-mono uppercase font-bold  text-[14.5px] ">
                        <span>Passsword</span>
                        <input type="password" 
                        className="h-8 text-10  bg-gray-50 border py-55-rem border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        name={'password'} 
                        value={formik?.values?.password}
                        onChange={formik.handleChange}
                        placeholder={'input your password'}/>
                        {
                            formik.errors &&
                            formik.errors.password &&
                            formik.touched &&
                            formik.touched.password &&
                            (
                                <span className={'!text-red-500 !text-xs'}>{formik.errors?.password}</span>
                            )
                        }
                    </label>
                    <button type="submit" className='  !w-full !rounded-xl !bg-orange-500 text-black border-black border-2'>Login</button>
                </form>
            </div>
        </div>
    )
}   