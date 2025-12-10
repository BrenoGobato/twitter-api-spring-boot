import { useState, useEffect, type FormEvent } from 'react';
import './TweetComments.css';

interface Comment {
  id: number;
  textoComentario: string;
  autor: {
    nome: string;
  };
}

interface TweetCommentsProps {
  postId: number;
  onCommentAdded: () => void;
  usuarioAtual: string; // Recebe o usuário logado
}

export function TweetComments({ postId, onCommentAdded, usuarioAtual }: TweetCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [texto, setTexto] = useState('');

  // Busca comentários ao carregar
  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts/${postId}/comentarios`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!texto.trim()) return;

    // Monta o comentário usando o usuarioAtual automaticamente
    const novoComentario = {
  textoComentario: texto,
  nomeAutor: usuarioAtual
};


    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts/${postId}/comentarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoComentario),
      });

      if (response.ok) {
        setTexto('');
        fetchComments(); // Recarrega a lista
        onCommentAdded(); // Avisa o card para atualizar o contador
      } else {
        alert('Erro ao enviar comentário.');
      }
    } catch (error) {
      console.error('Erro ao comentar:', error);
    }
  };

  return (
    <div className="tweet-comments-section">
      {/* Formulário sem campo de nome */}
      <form onSubmit={handleSubmit} className="comment-form">
        <div style={{ marginBottom: '8px', fontSize: '0.9rem', color: '#536471' }}>
          Comentando como <strong>@{usuarioAtual}</strong>:
        </div>
        <input
          type="text"
          placeholder="Poste sua resposta"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          className="comment-input"
        />
        <button type="submit" className="comment-submit-button">Responder</button>
      </form>

      {/* Lista de Comentários */}
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment-item">
            <div className="comment-avatar">
            <img 
              src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(comment.autor.nome)}`}
              alt={`Avatar de ${comment.autor.nome}`}
              // Mantemos o estilo pequeno para os comentários
              style={{ width: '30px', height: '30px', borderRadius: '50%' }}
            />
          </div>
            <div className="comment-content">
              <div className="comment-header">
                <span className="comment-author">{comment.autor?.nome || 'Anônimo'}</span>
              </div>
              <div className="comment-text">{comment.textoComentario}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}