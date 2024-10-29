'use client'

import Button from '@/app/components/Button'
import Inputs from '@/app/components/inputs/Inputs'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm, FieldValues, SubmitHandler, set } from 'react-hook-form'
import AuthSocialButton from './AuthSocialButton'
import { BsGithub, BsGoogle } from'react-icons/bs'
import axios from 'axios'
import toast from 'react-hot-toast'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


type Variant = 'login' |'signup'
const AuthForm = () => {
    const session = useSession()
    const router = useRouter();
    const [variant, setVariant] = useState('login')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if(session?.status === 'authenticated') {
            router.push('/users')
        }

    }, [session?.status])

    const toggleVariant = useCallback(() => {
        if(variant === 'login'){
            setVariant('signup')
        } else {
            setVariant('login')
        }
    }, [variant]);

    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        
        if(variant === 'login'){
            signIn('credentials', {
                ...data,
                redirect: false
            }).then((callback) => {
                if(callback?.error){
                    toast.error('Invalid credentials');
                }
                if(callback?.ok && !callback?.error) {
                    toast.success('Logged in successfully');
                    router.push('/users');
                }
            }).finally(() => {setIsLoading(false)});
        }
        
        if(variant ==='signup') {
            //NextAuth sign up request
            axios.post('/api/register', data)
            .then(() => {signIn('credentials', data)})
            .catch((error) => {
                console.log(error);
                toast.error('Error signing up, please try again later');
            }).finally(() => {setIsLoading(false)});
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true);
        //NextAAuth Social login request
        signIn(action, {
            redirect: false
        }).then((callback) => {
            if(callback?.error){
                toast.error('Invalid credentials');
            }
            if(callback?.ok && !callback?.error) {
                toast.success('Logged in successfully');
            }
        }).finally(() => {setIsLoading(false)});
    }
  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
            <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                {variant === 'signup' && (
                    <Inputs id='name' label='Name' register={register} errors={errors} />
                )}
                <Inputs id='email' label='Email' type='email' register={register} errors={errors} />
                <Inputs id='password' label='Password' type='password' register={register} errors={errors} />
                <div>
                    <Button 
                        disabled={isLoading}
                        fullwidth
                        type='submit'
                    >
                        {variant === 'login'? 'Log in' : 'Sign up'}
                    </Button>
                </div>
            </form>
            <div className='mt-6'>
                <div className='relative'>
                    <div className='absolute inset-0 flex items-center'>
                        <div className='w-full border-t border-gray-300' />
                    </div>
                    <div className='relative flex justify-center text-sm'>
                        <span className='px-2 bg-white text-gray-500'>
                            or continue with
                        </span>
                    </div>
                </div>

                <div className='mt-6 flex gap-2'>
                    <AuthSocialButton icon={BsGithub} onclick={() => socialAction('github')} />
                    <AuthSocialButton icon={BsGoogle} onclick={() => socialAction('google')} />
                </div>
            </div>
            <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
                <div>
                    {variant === 'login'? 'New to messenger?' : 'Already have an account?'}
                </div>
                <div
                    onClick={toggleVariant}
                    className='cursor-pointer underline'
                >
                    {variant === 'login'? 'Sign up' : 'Log in'}
                </div>
            </div>
        </div>
    </div>
  )
}

export default AuthForm