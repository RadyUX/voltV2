import Head from "next/head";
import Link from "next/link";
import { RouterOutputs, api } from "~/utils/api";
import { SignInButton, UserButton, SignOutButton, useUser } from "@clerk/nextjs"; // Make sure to import your button components

import { useRouter } from "next/router";
import { useForm } from "react-hook-form"
import { error } from "console";

type Collection = {
  id: string;
    name: string;
    userId: string;
}

export default function Sidebar() {
  const user = useUser();
  


  const createCollection = api.collection.create.useMutation();
  const collections = api.collection.getUserCollections.useQuery()
  const router = useRouter();

  const { register, handleSubmit } = useForm<Collection>();
  const onSubmit = (formData: Collection) => {
    createCollection.mutateAsync(formData).then(() => {
      void router.push("/");
      router.reload()
      
      
    })
    .catch((error)=>{
      console.error('lol')
    })
  };
  return (
    <>
   <div className="h-screen z-10 w-64 bg-gradient-to-b from-[#3a8980] to-[#31bec2] flex flex-col items-center ">
    <img src="https://i.imgur.com/l5ycBZr.png" alt="logo" className="h-[170px]"/>
    {user.isSignedIn ? (
        <>
            <UserButton/>
            <SignOutButton />
            <div className="container flex flex-col gap-12 px-4 py-16 ">

                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                            Enter collection name
                        </label>
                        <input id="name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-[#4B86C4] focus:ring-[#4B86C4] dark:border-gray-600 bg-white dark:text-white dark:placeholder-gray-400 dark:focus:border-[#4B86C4] dark:focus:ring-[#4B86C4]" {...register("name", { required: true })} />
                    </div>
                    <button type="submit" className="mb-2 mr-2 rounded-lg bg-gradient-to-b from-[#275d99] to-[#275d99]  px-5 py-2.5 text-sm font-medium text-white hover:bg-[#3A6D9F] focus:outline-none focus:ring-2 focus:ring-[#4B86C4] dark:bg-[#4B86C4] dark:hover:bg-[#3A6D9F] dark:focus:ring-[#4B86C4]">
                        Create
                    </button>
                </form>
                <ul className="space-y-4">
                    {collections?.data?.map((collection) => (
                      <Link href={`http://localhost:3000/${collection.id}`}>
                        <li key={collection.id} className="bg-white  bg-gradient-to-b  from-[#275d99] to-[#275d99]  p-4 rounded-lg shadow hover:shadow-md transform hover:scale-105 transition-transform duration-150 ease-in-out border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 mt-2">
                            <p className="text-gray-800 dark:text-gray-100 font-medium">{collection.name}</p>
                        </li>
                      </Link>
                    ))}
                </ul>
            </div>
        </>
    ) : (
        <SignInButton />
    )}
</div>

    </>
  );
}