import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col py-12 justify-center sm:px-6 lg:px-8 bg-gray-100">
        <div className="sm:mx-auto sm:w-full sm:max-w-md justify-center items-center">
          <div className="flex justify-center items-center">
            <Image src="/images/logo.png" alt="logo" width={48} height={48} />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 tracking-tight">
            Sign in to your account
          </h2>
        </div>
        <AuthForm />
    </div>
  );
}
