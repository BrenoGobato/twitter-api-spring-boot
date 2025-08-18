import { type Post } from '../interfaces/Api.interface';
import './TweetCard.css';

interface TweetCardProps {
  post: Post;
}

// Helper para formatar a data
const formatarData = (dataString: string) => {
  const data = new Date(dataString);
  return data.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export function TweetCard({ post }: TweetCardProps) {
  return (
    <div className="tweet-card">
      <div className="tweet-header">
        <span className="tweet-author">{post.autor.nome}</span>
        <span className="tweet-date">{formatarData(post.momentoPost)}</span>
      </div>
      <div className="tweet-body">
        <h3 className="tweet-title">{post.tituloPost}</h3>
        <p className="tweet-content">{post.conteudoPost}</p>
      </div>
      <div className="tweet-footer">
        <span>{post.likes} Likes</span>
        {/* Futuramente, aqui podemos adicionar botões de like e comentar */}
      </div>
    </div>
  );
}