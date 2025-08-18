import { useState, type FormEvent } from 'react';
import './AddGameForm.css'; // Vamos criar este arquivo de estilo daqui a pouco

// Definimos que este componente receberá uma função chamada onGameAdded
interface AddGameFormProps {
  onGameAdded: () => void;
}

export function AddGameForm({ onGameAdded }: AddGameFormProps) {
  // Criamos um "estado" para cada campo do formulário
  const [rawgId, setRawgId] = useState('');
  const [name, setName] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault(); // Impede que o navegador recarregue a página ao enviar

    const newGame = {
      rawgId: Number(rawgId), // Converte a string para número
      name,
      coverImageUrl,
    };

    try {
      const response = await fetch('http://localhost:3000/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGame),
      });

      if (!response.ok) {
        throw new Error('Falha ao adicionar o jogo na API');
      }

      // Se deu tudo certo:
      onGameAdded(); // 1. Avisa o componente pai para recarregar a lista de jogos
      
      // 2. Limpa os campos do formulário
      setRawgId('');
      setName('');
      setCoverImageUrl('');

    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao salvar o jogo.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-game-form">
      <h2>Adicionar Novo Jogo</h2>
      <div className="form-group">
        <label htmlFor="rawgId">RAWG ID</label>
        <input
          id="rawgId"
          type="number"
          value={rawgId}
          onChange={(e) => setRawgId(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="name">Nome do Jogo</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="coverImageUrl">URL da Imagem de Capa</label>
        <input
          id="coverImageUrl"
          type="text"
          value={coverImageUrl}
          onChange={(e) => setCoverImageUrl(e.target.value)}
          required
        />
      </div>
      <button type="submit">Adicionar Jogo</button>
    </form>
  );
}