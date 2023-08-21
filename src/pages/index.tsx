
import Head from "next/head";
import Link from "next/link";
import { RouterOutputs, api } from "~/utils/api";
import { SignInButton, UserButton, SignOutButton, useUser } from "@clerk/nextjs"; // Make sure to import your button components
import {use, useState} from 'react'
import { useRouter } from "next/router";
import { useForm } from "react-hook-form"

import Sidebar from "./components/Sidebar";
import Modal from "./components/modal";
type Article = {
   title: string
   url: string
   imageUrl: string
   collectionId: string
}


export default function Home() {
 const user = useUser()
  const router = useRouter()
  const { register, handleSubmit, reset } = useForm<Article>();
  const { data: collectionsData } = api.collection.getUserCollections.useQuery();
 const createArticle = api.article.create.useMutation()

  const onSubmit = (formData: Article) => {
    createArticle.mutateAsync(formData).then(() => {
      router.push("/");
      reset()
    });
  };

  function onClose() {
    router.push("/")
  
    console.log("Modal has closed")
}

function onOk() {
     router.push("/")
    console.log("Ok was clicked")
}


  const handle = () => {
    router.push(`${router.pathname}?showDialog=y`)}
  return (
    <>
 
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
  
      <main className="flex min-h-screen flex  bg-gradient-to-b">
      <Sidebar/>
     
     

  <h1>Article</h1>
  <Modal title="article" onClose={onClose} onOk={onOk}>
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Item Name
              </label>
              <input
                id="title"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...register("title", { required: true })}
              />
            </div>

            <div>
              <label
                htmlFor="url"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                url
              </label>
              <input
                id="url"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...register("url", { required: true })}
              />
            </div>
            <div>
              <label
                htmlFor="Imageurl"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                url
              </label>
              <input
                id="Imageurl"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...register("imageUrl", { required: true })}
              />
            </div>

            <select {...register("collectionId", { required: true })}>
            {collectionsData && collectionsData.length > 0 ? (
  collectionsData.map(collection => (
    <option key={collection.id} value={collection.id}>{collection.name}</option>
  ))
) : (
  <option value="">Aucune collection</option>
)}
</select>

<button
              type="submit"
              className="mb-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >create
            </button>
</form>
</Modal>
<div>
           {user.isSignedIn &&

<button
         onClick={handle}   
              className="mb-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
         Ajouter article
            </button>
           }  
            
            </div>
          

 <div>

 </div>
         
      </main>


    </>
  );
}
