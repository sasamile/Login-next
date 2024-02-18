"use client";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Alert from "@mui/material/Alert";

function RegisterPage() {
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      return alert("Passwords do not match");
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);

    if (res.ok) {
      router.push("/");
    }else{
      setError("El Usario Ya Existe")
    }
  });
  
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 max-md:grid-rows-2 justify-center my-[3%] md:w-[70%] mx-auto bg-shadow md:rounded-2xl w-[95%]">
      <div className="bg-fondo bg-shadow md:rounded-tl-2xl md:rounded-bl-2xl relative">
        <div className="bg-black/40 absolute inset-0 md:rounded-tl-2xl md:rounded-bl-2xl">
          <div className="flex flex-col items-center justify-center space-y-12 my-[20%]">
            <h1 className="text-7xl w-[50%] text-center font-bold text-white">
              Hola amigos
            </h1>
            <p className="text-xl w-[80%] mx-auto text-center text-white">
              Si tienes una cuenta, inicia sesion aqui y diviertete
            </p>

            <button className=" gap-4 parent">
              <Link
                href={"/"}
                className=" flex items-center bg-slate-500/40 px-20 py-4 rounded-3xl border-2 text-white"
              >
                <FaArrowLeft className="child" />
                <p>Iniciar Sesion</p>
              </Link>
            </button>
          </div>
        </div>
      </div>
      <form
        onSubmit={onSubmit}
        className=" bg-white p-12 grid items-center bg-shadow md:rounded-tr-2xl md:rounded-br-2xl relative"
      >
        {error && <Alert severity="warning">{error}</Alert>}
        <h1 className="text-slate-500 font-bold text-4xl mb-4 text-center ">
          Register
        </h1>

        <label htmlFor="username" className="text-slate-500 mb-2 block text-sm">
          Username:
        </label>
        <input
          type="text"
          {...register("username", {
            required: {
              value: true,
              message: "Username is required",
            },
          })}
          className="py-2 rounded block mb-2  border-b-2 outline-none text-slate-700 w-full"
          placeholder="yourUser123"
        />

        {errors.username && (
          <span className="text-red-500 text-xs">
            {errors.username.message}
          </span>
        )}

        <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">
          Email:
        </label>
        <input
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
          })}
          className="py-2 rounded block mb-2  border-b-2 outline-none text-slate-700 w-full"
          placeholder="user@email.com"
        />
        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email.message}</span>
        )}

        <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">
          Password:
        </label>
        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
          className="py-2 rounded block mb-2  border-b-2 outline-none text-slate-700 w-full"
          placeholder="********"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}

        <label
          htmlFor="confirmPassword"
          className="text-slate-500 mb-2 block text-sm"
        >
          Confirm Password:
        </label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Confirm Password is required",
            },
          })}
          className="py-2 rounded block mb-2  border-b-2 outline-none text-slate-700 w-full"
          placeholder="********"
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </span>
        )}

        <button className="w-[80%] rounded-full mx-auto font-bold text-xl bg-slate-600 hover:bg-slate-900 text-white p-3 py-4  mt-4">
          Register
        </button>
      </form>
    </div>
  );
}
export default RegisterPage;
