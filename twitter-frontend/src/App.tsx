import { useState, useEffect } from 'react';
import { TweetCard } from './components/TweetCard'; // Importa o novo TweetCard
import { type Post } from './interfaces/Api.interface';
import './App.css';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/posts`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Ordenar por ID em ordem decrescente para ver os mais novos primeiro
      setPosts(data.sort((a, b) => b.id - a.id));
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="app-container">
      <h1>Twitter Clone (Java + React)</h1>

      <hr className="separator" />

      <h2>Timeline</h2>
      <div className="post-list">
        {posts.map((post) => (
          // Agora usamos nosso componente TweetCard!
          <TweetCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default App;