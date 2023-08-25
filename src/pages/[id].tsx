
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { api } from '~/utils/api';
import { ArticleView } from './components/ArticleView';
import Image from "next/image";

const CollectionPage: NextPage<{id: string}> = ({ id })=>{
  const router = useRouter();
  
  const { data } = api.collection.getCollectionById.useQuery({ 
    id: router.query.id as string
   },
  
   );
 
  if (!data) return <div>404</div>;
return (
  <>
      <h1 className='text-3xl'>Collection: {data.name}</h1>
      {data.articles && data.articles.length > 0 ? (
        
          <ArticleView articles={data.articles} />
        
      ) : (
        <p>Aucun article pour cette collection.</p>
      )}
    
    </>
  );
};

export default CollectionPage;