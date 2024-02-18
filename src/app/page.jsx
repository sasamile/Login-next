"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Alert from "@mui/material/Alert";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [error, setError] = useState(null);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    console.log(res);
    if (res.error) {
      setError(res.error);
    } else {
      router.push("https://sasamile.github.io/Portafolio/");
      router.refresh();
    }
  });

  return (
    <div
      className="grid md:grid-cols-2 grid-cols-1 max-md:grid-rows-2 justify-center my-[3%] md:w-[70%] mx-auto bg-shadow md:rounded-2xl w-[95%] 
    md:h-[calc(100vh-5rem)] max-md:h-[1200px]"
    >
      
      <form
        onSubmit={onSubmit}
        className=" bg-white p-12 grid items-center  md:rounded-tl-2xl md:rounded-bl-2xl relative"
      >
        
        <h1 className="text-slate-500 font-bold text-4xl mb-4 text-center ">
          Inicia Sesion Aqui
        </h1>

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
          placeholder="******"
        />

        {errors.password && (
          <span className="text-red-500 text-xs">
            {errors.password.message}
          </span>
        )}

        <button className="w-[80%] rounded-full mx-auto font-bold text-xl bg-slate-600 hover:bg-slate-900 text-white p-3 py-4  mt-4">
          Login
        </button>
        {error && (
        
        <Alert severity="warning">{error}</Alert>
      
    )}
      </form>
      <div className="bg-fondo  md:rounded-tr-2xl md:rounded-br-2xl relative">
        <div className="bg-black/40 absolute inset-0 md:rounded-tr-2xl md:rounded-br-2xl">
          <div className="flex flex-col items-center justify-center space-y-12 my-[20%]">
            <h1 className="  text-6xl text-center font-bold text-white">
              Bienvenidos
            </h1>
            <p className="text-xl w-[80%] mx-auto text-center text-white">
              Si no tienes una cuenta, Registrate aqui y diviertete
            </p>

            <button className="parent">
              <Link
                href={"/auth/register"}
                className=" flex items-center bg-slate-500/40 px-20 py-4 rounded-3xl border-2 text-white"
              >
                <p>Registrarte</p>
                <div className=" rotate-180 p-2">
                  <FaArrowLeft className="child" />
                </div>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
