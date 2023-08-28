
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { api } from '~/utils/api';
import { ArticleView } from './components/ArticleView';
import Image from "next/image";
import{ toast } from 'react-hot-toast'
const CollectionPage: NextPage<{id: string}> = ({ id })=>{
  const router = useRouter();
  
  const { data } = api.collection.getCollectionById.useQuery({ 
    id: router.query.id as string
   },
  
   );
   
   const deleteCollection = api.collection.delete.useMutation()
 
  if (!data) return <div>404</div>;
  const handleDelete = (id: string) =>{
    router.push('/')
    console.log(id)
   deleteCollection.mutate(id)
  toast.error("collection deleted ⚡")
  }
return (
  <>
      <h1 className='text-3xl'>Collection: {data.name}</h1>
      {data.articles && data.articles.length > 0 ? (
        
          <ArticleView articles={data.articles} />
        
      ) : (
        <p>No article in this collection</p>
      )}
     <button
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                            onClick={() => handleDelete(data.id)}  // Passez l'ID de l'article ici
                        >
                            Delete
                        </button>
    </>
  );
};

export default CollectionPage;