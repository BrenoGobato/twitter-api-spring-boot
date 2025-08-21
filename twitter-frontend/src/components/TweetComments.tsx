import { useState, useEffect } from 'react';
import { type Comment } from '../interfaces/Api.interface';
import './TweetComments.css';

interface TweetCommentsProps {
  postId: number;
  onCommentAdded: () => void;
}

export function TweetComments({ postId, onCommentAdded }: TweetCommentsProps) {
  const [textoComentario, setTextoComentario] = useState('');
  const [nomeAutor, setNomeAutor] = useState('');
  const [comentariosLocais, setComentariosLocais] = useState<Comment[]>([]);
  const [enviando, setEnviando] = useState(false);
  const [carregando, setCarregando] = useState(true);

  // Buscar comentários quando abrir
  useEffect(() => {
    const buscarComentarios = async () => {
      setCarregando(true);
      try {
        const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/posts/${postId}/comentarios`;
        console.log('🔍 BUSCANDO COMENTÁRIOS EM:', apiUrl);
        
        const response = await fetch(apiUrl);
        console.log('📡 STATUS:', response.status);
        
        if (response.ok) {
          const comentarios = await response.json();
          console.log('✅ COMENTÁRIOS ENCONTRADOS:', comentarios);
          setComentariosLocais(comentarios);
        } else {
          console.error('❌ ERRO NA RESPOSTA');
        }
      } catch (error) {
        console.error('❌ ERRO AO BUSCAR:', error);
      } finally {
        setCarregando(false);
      }
    };

    buscarComentarios();
  }, [postId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!textoComentario.trim() || !nomeAutor.trim()) return;

    setEnviando(true);
    
    try {
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/posts/${postId}/comentarios`;
      console.log('📍 ENVIANDO PARA:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          textoComentario: textoComentario,
          nomeAutor: nomeAutor
        }),
      });

      console.log('✅ STATUS POST:', response.status);

      if (!response.ok) {
        throw new Error('Falha ao adicionar comentário');
      }

      const novoComentarioSalvo = await response.json();
      console.log('🎉 NOVO COMENTÁRIO:', novoComentarioSalvo);
      
      // Busca os comentários atualizados
      const refreshResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts/${postId}/comentarios`);
      if (refreshResponse.ok) {
        const comentariosAtualizados = await refreshResponse.json();
        console.log('🔄 COMENTÁRIOS ATUALIZADOS:', comentariosAtualizados);
        setComentariosLocais(comentariosAtualizados);
      }
      
      setTextoComentario('');
      setNomeAutor('');
      onCommentAdded();
      
    } catch (error) {
      console.error('❌ ERRO:', error);
      alert('Erro ao adicionar comentário.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="tweet-comments">
      <h3>Comentários ({comentariosLocais.length})</h3>
      
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          placeholder="Seu nome"
          value={nomeAutor}
          onChange={(e) => setNomeAutor(e.target.value)}
          required
          disabled={enviando}
        />
        <textarea
          placeholder="Adicione um comentário..."
          value={textoComentario}
          onChange={(e) => setTextoComentario(e.target.value)}
          required
          disabled={enviando}
        />
        <button type="submit" disabled={enviando}>
          {enviando ? 'Enviando...' : 'Comentar'}
        </button>
      </form>

      <div className="comments-list">
        {carregando ? (
          <p>Carregando comentários...</p>
        ) : comentariosLocais.length === 0 ? (
          <p>Nenhum comentário ainda. Seja o primeiro a comentar!</p>
        ) : (
          comentariosLocais.map((comentario) => (
            <div key={comentario.id} className="comment-item">
              <div className="comment-header">
                <strong>{comentario.autor?.nome || 'Anônimo'}</strong>
              </div>
              <p className="comment-content">{comentario.textoComentario}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}