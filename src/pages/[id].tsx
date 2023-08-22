
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
    <div>
      <h1>Collection: {data.name}</h1>
      {data.articles && data.articles.length > 0 ? (
        <ul>
          {data.articles.map(article => (
            <li key={article.id}>
                <img src={article.imageUrl} alt={article.title} />
                    <h2>{article.title}</h2>
                    <p>{article.url}</p>
              {/* Affichez d'autres détails sur l'article ici */}
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun article pour cette collection.</p>
      )}
    </div>
  );
};

export default CollectionPage;