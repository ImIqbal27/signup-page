import React from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import { useForm } from "react-hook-form";
import Loading from './Loading';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const navigate = useNavigate();

    let signInErrorMessage;
    if (error || gError) {
        signInErrorMessage = <p className='text-red-500'>
            <small>{error?.message || gError?.message}</small>
        </p>

    }
    if (loading || gLoading) {
        return <Loading></Loading>
    }

    if (user || gUser) {
        toast.success('Succesfully Sign in  👌')
        navigate('/home');
    }

    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password);
    };

    return (
        <div className='flex px-24 justify-between '>
            <div className=' hidden  lg:block md:block'>
                <img src="https://img.freepik.com/free-vector/account-concept-illustration_114360-399.jpg" alt="" />
            </div>

            <div className='flex h-screen justify-end items-center px-24'>
                <div className="card w-96 bg-base-100 shadow-xl">

                    <div className="card-body">
                        <h2 className=" text-center text-2xl font-bold">Sign In</h2>

                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Email </span>

                                </label>
                                <input
                                    type="email"
                                    // placeholder="What is your email?"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: "Email is required ! "
                                        },
                                        pattern: {
                                            value: /[A-Za-z]{3}/,
                                            message: 'Provide a valid email .'
                                        }
                                    }
                                    )}
                                />
                                <label className="label">
                                    {errors.email?.type === 'required' &&
                                        <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                    {errors.email?.type === 'pattern' &&
                                        <span className="label-text-alt text-red-500">{errors.email.message}</span>}


                                </label>
                            </div>
                            {/* /////////////////////////////////////////////// */}
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Password </span>

                                </label>
                                <input
                                    type="password"
                                    // placeholder="What is your password?"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: "Password is required ! "
                                        },
                                        minLength: {
                                            value: 6,
                                            message: 'At least 6 character  or longer.'
                                        }
                                    }
                                    )}
                                />
                                <label className="label">
                                    {errors.password?.type === 'required' &&
                                        <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                    {errors.password?.type === 'minLength' &&
                                        <span className="label-text-alt text-red-500">{errors.password.message}</span>}


                                </label>
                            </div>
                            {/* ***************************************** */}
                            {signInErrorMessage}

                            <input
                                className='btn btn-active btn-success w-full max-w-xs text-white' value='Login'
                                type="submit" />
                        </form>

                        <p> <small>New to Gali-To-Gali ? <Link to='/signup' className='text-primary'>Please Sign up</Link></small>
                        </p>


                        <div className="divider">OR</div>
                        <button
                            onClick={() => signInWithGoogle()}
                            className="btn btn-outline btn-success">Continue With Google</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;