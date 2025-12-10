import { useState, type FormEvent } from 'react';
import './AddTweetForm.css';

interface AddTweetFormProps {
  onTweetAdded: () => void;
  onFormSubmit: () => void;
  usuarioAtual: string; // Recebe o nome do usuário logado
}

export function AddTweetForm({ onTweetAdded, onFormSubmit, usuarioAtual }: AddTweetFormProps) {
  const [conteudo, setConteudo] = useState('');
  
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    
    if (!conteudo.trim()) {
      alert('Escreva alguma coisa!');
      return;
    }

    const newPost = { 
      conteudo: conteudo,
      nomeAutor: usuarioAtual // Usa o nome que veio do App.tsx
    };

    try {
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/posts`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) throw new Error('Erro ao postar');

      onTweetAdded();
      onFormSubmit();
      setConteudo('');
    } catch (error) {
      console.error(error);
      alert('Erro ao criar post.');
    }
  };

  return (
    <form className="add-tweet-form" onSubmit={handleSubmit}>
      {/* Mostra quem está postando, mas não deixa editar */}
      <div style={{ color: '#536471', fontSize: '0.9rem', marginBottom: '5px' }}>
        Postando como: <strong>@{usuarioAtual}</strong>
      </div>
      
      <textarea 
        placeholder="O que está acontecendo?" 
        value={conteudo} 
        onChange={e => setConteudo(e.target.value)} 
        required 
        rows={4}
        autoFocus // Foca automaticamente ao abrir
      />
      <button type="submit">Postar</button>
    </form>
  );
}