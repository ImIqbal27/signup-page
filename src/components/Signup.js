import React from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import { useForm } from "react-hook-form";
import Loading from './Loading';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    const navigate = useNavigate();

    let signInErrorMessage;
    if (error || gError || updateError) {
        signInErrorMessage = <p className='text-red-500'>
            <small>{error?.message || gError?.message || updateError?.message}</small>
        </p>

    }
    if (gLoading || loading || updating) {
        return <Loading></Loading>
    }

    if (user || gUser) {
        console.log(user);
        navigate('/home');
        toast.success('Succesfully Sign up  👌')
    }

    const onSubmit = async data => {
        // console.log(data);
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name });

    };

    return (
        <div className='flex px-24 justify-between'>
            <div className=' hidden  lg:block md:block'>
                <img src="https://img.freepik.com/free-vector/account-concept-illustration_114360-399.jpg" alt="" />
            </div>

            <div className='flex h-screen justify-end items-center px-24'>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className=" text-center text-2xl font-bold">Sign Up</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Name </span>
                                </label>
                                <input
                                    type="text"
                                    // placeholder="What is your name?"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message: "Name is required ! "
                                        },
                                    }
                                    )}
                                />
                                <label className="label">
                                    {errors.name?.type === 'required' &&
                                        <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                                </label>
                            </div>
                            {/* ************************************************ */}
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
                                className='btn btn-active btn-success w-full max-w-xs text-white' value='Signup'
                                type="submit" />
                        </form>
                        <p> <small>Already have an account  ? <Link to='/' className='text-primary'>Please Sign in </Link></small>
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

export default Signup;