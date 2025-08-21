import { useState, useEffect } from 'react';
import { type Post } from '../interfaces/Api.interface';
import { TweetComments } from './TweetComments';
import './TweetCard.css';

interface TweetCardProps {
  post: Post;
  onPostDeleted: (deletedPostId: number) => void;
  onPostUpdated: () => void;
}

const formatarData = (dataString: string) => {
  if (!dataString) return '';
  const data = new Date(dataString);
  return data.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export function TweetCard({ post, onPostDeleted, onPostUpdated }: TweetCardProps) {
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [comentariosCount, setComentariosCount] = useState(0);
  const [comentariosAtualizados, setComentariosAtualizados] = useState(false);

  // Buscar a contagem real de comentários
  useEffect(() => {
    const buscarContagemComentarios = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts/${post.id}/comentarios`);
        if (response.ok) {
          const comentarios = await response.json();
          setComentariosCount(comentarios.length);
        }
      } catch (error) {
        console.error('Erro ao buscar comentários:', error);
        // Se der erro, usa a contagem dos props
        setComentariosCount(post.comentarios?.length || 0);
      }
    };

    buscarContagemComentarios();
  }, [post.id, post.comentarios, comentariosAtualizados]);

  const handleDelete = async () => {
    if (!window.confirm(`Tem certeza que deseja deletar este post?`)) {
      return;
    }
    try {
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/posts/${post.id}`;
      const response = await fetch(apiUrl, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Falha ao deletar o post na API.');
      }
      onPostDeleted(post.id);
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao deletar o post.');
    }
  };

  const handleLike = async () => {
    setLikesCount(currentLikes => currentLikes + 1);
    try {
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/posts/${post.id}/like`;
      const response = await fetch(apiUrl, { method: 'PATCH' });
      if (!response.ok) {
        setLikesCount(currentLikes => currentLikes - 1);
        throw new Error('Falha ao curtir o post.');
      }
      const updatedPost = await response.json();
      setLikesCount(updatedPost.likes);
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao curtir o post.');
    }
  };

  const handleCommentAdded = () => {
    // Força a atualização da contagem
    setComentariosAtualizados(prev => !prev);
    // Notifica o componente pai para atualizar os posts
    onPostUpdated();
  };

  return (
    <div className="tweet-card-container">
      <div className="tweet-avatar">
        <img src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png" alt="Avatar" />
      </div>
      <div className="tweet-main">
        <div className="tweet-header">
          <span className="tweet-author">{post.autor.nome}</span>
          <span className="tweet-handle">@{post.autor.nome.toLowerCase().replace(/\s+/g, '')}</span>
          <span className="tweet-dot">·</span>
          <span className="tweet-date">{formatarData(post.momentoPost)}</span>
        </div>
        <div className="tweet-body">
          <p className="tweet-content">{post.conteudoPost}</p>
        </div>
        <div className="tweet-footer">
          <button onClick={handleLike} className="like-button">
            ❤️ {likesCount} Likes
          </button>
          <button onClick={() => setShowComments(!showComments)} className="comment-button">
            💬 {comentariosCount} Comentários
          </button>
          <button onClick={handleDelete} className="delete-button-tweet">Deletar</button>
        </div>
        
        {showComments && (
          <TweetComments 
            postId={post.id}
            onCommentAdded={handleCommentAdded}
          />
        )}
      </div>
    </div>
  );
}