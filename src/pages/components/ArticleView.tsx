import Image from "next/image";
import Link from "next/link";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
type ArticleType = {
    id: string;
    imageUrl: string;
    title: string;
    url: string;
};

interface ArticleViewProps {
    articles: ArticleType[];
}

export const ArticleView: React.FC<ArticleViewProps> = ({ articles }) => {
    const router = useRouter();
    if (!articles || articles.length === 0) return <div>No articles found for this collection.</div>;
    
    const deleteArticle = api.article.delete.useMutation();

    const handleDelete = (id: string) => {
        deleteArticle.mutate(id);
        console.log('deleted');
        router.reload()
        
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {articles.map(article => (
                <div key={article.id} className="bg-white h-[320px] w-[320px] lg:w-[450px]  shadow-lg rounded-lg overflow-hidden dark:bg-gray-800">
                    <Link href={article.url}>
                        <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover mb-4 rounded-t-lg" />
                        <div className="p-4">
                            <h2 className="text-xl font-bold dark:text-white mb-2">{article.title}</h2>
                        </div>
                    </Link>
                
                    <div className="mt-4 flex justify-between items-center">
                        <button
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                            onClick={() => handleDelete(article.id)}  // Passez l'ID de l'article ici
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
