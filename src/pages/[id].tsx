
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { api } from '~/utils/api';
import { ArticleView } from './components/ArticleView';


const CollectionPage: NextPage<{id: string}> = ({ id })=>{
  const router = useRouter();
  const { data } = api.collection.getCollectionById.useQuery({ 
    id: router.query.id as string
   },
  
   );
 
  if (!data) return <div>404</div>;

return (
  <div>
  <h1>Collection: {data.name}</h1>
  
 
</div>
)

}

export default CollectionPage