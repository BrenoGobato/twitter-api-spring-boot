import { useState, useEffect } from 'react';
import { TweetCard } from './components/TweetCard';
import { AddTweetForm } from './components/AddTweetForm';
import { Modal } from './components/Modal';
import { type Post } from './interfaces/Api.interface';
import './App.css';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPosts = async () => {
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/posts`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Falha ao buscar posts.');
    }
    const data = await response.json();
    setPosts(data.sort((a: Post, b: Post) => b.id - a.id));
    } catch (error) {
    console.error('Erro ao buscar posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostDeleted = (deletedPostId: number) => {
    setPosts(currentPosts => currentPosts.filter(post => post.id !== deletedPostId));
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <button className="tweet-button" onClick={() => setIsModalOpen(true)}>
          Tweetar
        </button>
      </aside>

      <main className="main-content">
        <h1>Página Inicial</h1>
        <div className="timeline">
          {posts.map((post) => (
            <TweetCard
              key={post.id}
              post={post}
              onPostDeleted={handlePostDeleted}
              onPostUpdated={fetchPosts}
            />
          ))}
        </div>
      </main>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddTweetForm 
          onTweetAdded={() => {
            fetchPosts();
            setIsModalOpen(false);
          }}
          onFormSubmit={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default App;