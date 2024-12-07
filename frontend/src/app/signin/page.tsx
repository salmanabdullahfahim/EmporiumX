"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { ArrowRight, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Shared/Logo/Logo";
import { useLoginMutation } from "@/redux/api/authApi";

interface SignInUser {
  email: string;
  password: string;
}

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInUser>();
  const router = useRouter(); // Initialize the router
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: SignInUser) => {
    try {
      const result = await login(data).unwrap();
      console.log(result.data);
      // Assuming the API returns a token or user data
      if (result?.data.accessToken) {
        // You might want to store the token in localStorage or Redux store here
        localStorage.setItem("accessToken", result.data.accessToken);
        window.location.href = "/";
      }
    } catch (error) {
      // Handle error - you might want to show an error message to the user
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-12">
        <div className="w-full relative mb-6">
          <input
            type="email"
            className="bg-transparent border-b border-black focus:outline-none focus:border-green-600 text-sm w-full py-2"
            placeholder="Email Address"
            {...register("email", {
              required: "Email is required",
              pattern: /^\S+@\S+$/i,
            })}
          />
          <Mail
            className="absolute top-1/2 -translate-y-1/2 right-2 opacity-80"
            size={18}
          />
          {errors.email && (
            <span className="text-red-500 text-xs">
              {errors.email.message?.toString() ?? ""}
            </span>
          )}
        </div>

        <div className="w-full relative mb-2">
          <input
            type="password"
            className="bg-transparent border-b border-black focus:outline-none focus:border-green-600 text-sm w-full py-2"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
            })}
          />
          <Lock
            className="absolute top-1/2 -translate-y-1/2 right-2 opacity-80"
            size={18}
          />
          {errors.password && (
            <span className="text-red-500 text-xs">
              {errors.password.message?.toString()}
            </span>
          )}
        </div>

        <div className="flex justify-end text-sm mt-2 mb-4">
          <Link
            href="/forget-password"
            className="hover:underline hover:text-green-600 duration-300"
          >
            Forget Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-green-500 py-4 px-10 text-white hover:bg-opacity-95 duration-300 mt-4 flex items-center rounded-md font-semibold disabled:opacity-70"
        >
          {isLoading ? "Signing in..." : "Sign In"}{" "}
          <ArrowRight className="ml-2" size={18} />
        </button>
      </form>
    </>
  );
};

const SignIn15 = () => {
  return (
    <section className="ezy__signin15 light flex items-center justify-center py-14 md:py-24 bg-white text-black text-opacity-90 overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="flex justify-center">
          <div className="w-full md:w-2/3">
            <div className="bg-white shadow-xl p-6 lg:p-12">
              <div className="flex flex-wrap justify-between items-center">
                <div className="w-full lg:w-1/2 lg:order-2">
                  <div className="flex flex-col items-center justify-center h-full mt-12 lg:mt-0">
                    <Image
                      src="https://cdn.easyfrontend.com/pictures/sign-in-up/abstract1.png"
                      alt="Abstract"
                      width={300}
                      height={300}
                    />
                    <div className="text-center mt-12">
                      Don&apos;t have an account?
                      <Link
                        href="/signup"
                        className="underline hover:text-green-600 duration-300"
                      >
                        {" "}
                        Sign Up
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
                  <div className="flex flex-col h-full p-2 lg:p-6 xl:p-12">
                    <Logo />
                    <h2 className="my-6 text-xl font-semibold">
                      Sign In to your account
                    </h2>
                    <SignInForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function SignInPage() {
  return <SignIn15 />;
}
