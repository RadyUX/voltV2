import Image from "next/image";
import { api } from "~/utils/api";


export const ArticleView = ({ collectionId }: { collectionId: string }) => {
    // Utilisez la requête appropriée pour récupérer les articles d'une collection spécifique
    const { data: articles, error, isLoading } = api.article.getArticleByCollectionId.useQuery({ collectionId });
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading articles: {error.message}</div>;
    if (!articles || articles.length === 0) return <div>No articles found for this collection.</div>;

    return (
        <div>
            {articles.map((article) => (
                <div key={article.id}>
                 
                    
                </div>
            ))}
        </div>
    );
}
