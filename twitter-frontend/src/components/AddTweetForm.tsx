import { useState, type FormEvent } from 'react';
import './AddTweetForm.css';

interface AddTweetFormProps {
  onTweetAdded: () => void;
  onFormSubmit: () => void;
}

export function AddTweetForm({ onTweetAdded, onFormSubmit }: AddTweetFormProps) {
  const [conteudo, setConteudo] = useState('');
  const [nomeAutor, setNomeAutor] = useState('');
  
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    
    // Verifica se os campos estão preenchidos
    if (!conteudo.trim() || !nomeAutor.trim()) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    // DEBUG: Mostra exatamente o que está sendo enviado
    const newPost = { 
      conteudo: conteudo,
      nomeAutor: nomeAutor 
    };

    console.log('📤 DADOS QUE ESTÃO SENDO ENVIADOS:', newPost);
    console.log('📤 TIPO DO conteudo:', typeof conteudo, 'Valor:', conteudo);
    console.log('📤 URL da API:', `${import.meta.env.VITE_API_BASE_URL}/posts`);

    try {
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/posts`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(newPost),
      });

      console.log('📡 STATUS DA RESPOSTA:', response.status);
      console.log('📡 HEADERS:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ ERRO DA API:', errorText);
        throw new Error(`Falha ao criar o post: ${response.status} ${errorText}`);
      }

      const postCriado = await response.json();
      console.log('✅ POST CRIADO COM SUCESSO:', postCriado);
      
      onTweetAdded();
      onFormSubmit();
      
      setConteudo('');
      setNomeAutor('');
    } catch (error) {
      console.error('❌ ERRO COMPLETO:', error);
      alert('Ocorreu um erro ao criar o post. Verifique o console.');
    }
  };

  return (
    <form className="add-tweet-form" onSubmit={handleSubmit}>
      <h2>Novo Tweet</h2>
      <input 
        type="text" 
        placeholder="Seu nome" 
        value={nomeAutor} 
        onChange={e => setNomeAutor(e.target.value)} 
        required 
      />
      <textarea 
        placeholder="O que está acontecendo?" 
        value={conteudo} 
        onChange={e => setConteudo(e.target.value)} 
        required 
        rows={4}
      />
      <button type="submit">Postar</button>
    </form>
  );
}