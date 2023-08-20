import Head from "next/head";
import Link from "next/link";
import { RouterOutputs, api } from "~/utils/api";
import { SignInButton, UserButton, SignOutButton, useUser } from "@clerk/nextjs"; // Make sure to import your button components
import {useState} from 'react'
import { useRouter } from "next/router";
import { useForm } from "react-hook-form"

type Collection = RouterOutputs["collection"]["getUserCollections"]

export default function Sidebar() {
  const user = useUser();
  


  const createCollection = api.collection.create.useMutation();
  const collections = api.collection.getUserCollections.useQuery()
  const router = useRouter();

  const { register, handleSubmit } = useForm<Collection>();
  const onSubmit = (formData: Collection) => {
    createCollection.mutateAsync(formData).then(() => {
      router.push("/");
    });
  };
  return (
    <>
    <div className="h-screen w-64 bg-gradient-to-b from-[#d5baff] to-[#15162c] flex flex-col items-center py-8">
      {user.isSignedIn ? (
        <>
              <UserButton />
          <SignOutButton />
          <div className="container flex flex-col gap-12 px-4 py-16 ">
          <h1 className="text-4xl">Collection</h1>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
               enter collection name
              </label>
              <input
                id="name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...register("name", { required: true })}
              />
            </div>

           

            <button
              type="submit"
              className="mb-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create
            </button>
          </form>

          
          <ul>
          {collections.data.map((collection) => (
            <li key={collection.id}>{collection.name}</li>
          ))}
        </ul>

        </div>
          
        </>
      ) : (
        <>
      <SignInButton/>
        </>
      )}
    </div>

    <div>
    
 
    </div>
    </>
  );
}
