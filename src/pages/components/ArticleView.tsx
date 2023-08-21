import Image from "next/image";
import { api } from "~/utils/api";

export const ArticleView = ({ collectionId }: { collectionId: string }) => {
    const { data: articles, error, isLoading } = api.article.getUserArticle.useQuery();
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading articles: {error.message}</div>;
    if (!articles || articles.length === 0) return <div>No articles found for this collection.</div>;

    return (
        <div>
            {articles.map((article) => (
                <div key={article.id}>
                   <Image src={article.imageUrl} alt={article.title} width={500} height={500} />
                    <h2>{article.title}</h2>
                    <p>{article.url}</p>
                    {/* ... other properties ... */}
                </div>
            ))}
        </div>
    );
}
