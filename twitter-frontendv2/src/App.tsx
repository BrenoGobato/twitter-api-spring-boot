import { useState, useEffect } from 'react';
import { TweetCard } from './components/TweetCard';
import { AddTweetForm } from './components/AddTweetForm';
import { Modal } from './components/Modal';
import { type Post } from './interfaces/Api.interface';
import './App.css';

function SmallTweetButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="small-tweet-button" onClick={onClick}>
      Postar
    </button>
  );
}

function App() {
  const [usuarioAtual, setUsuarioAtual] = useState('');
  const [inputLogin, setInputLogin] = useState('');

  const [posts, setPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState<'home' | 'meus_tweets'>('home');

  const fetchPosts = async () => {
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/posts`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Falha ao buscar posts.');
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputLogin.trim()) {
        setUsuarioAtual(inputLogin.trim());
    }
  };

  if (!usuarioAtual) {
    return (
        <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '300px', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '20px' }}>Y</div>
                <h2 style={{ margin: 0 }}>Entrar no Y</h2>
                <input 
                    type="text" 
                    placeholder="Qual seu nome de usuário?" 
                    value={inputLogin}
                    onChange={(e) => setInputLogin(e.target.value)}
                    style={{ padding: '15px', fontSize: '1.1rem', borderRadius: '5px', border: '1px solid #ccc' }}
                    autoFocus
                />
                <button type="submit" style={{ padding: '15px', fontSize: '1.1rem', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '9999px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Entrar
                </button>
            </form>
        </div>
    );
  }

  const postsExibidos = abaAtiva === 'home' 
    ? posts 
    : posts.filter(post => (post.autor?.nome || "").toLowerCase() === (usuarioAtual || "").toLowerCase());

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="app-title-y" onClick={() => setAbaAtiva('home')}>Y</div>
        <nav className="nav-menu">
            <ul>
                <li onClick={() => setAbaAtiva('home')} style={{ fontWeight: abaAtiva === 'home' ? '700' : '400' }}>
                  Página Inicial
                </li>
                <li onClick={() => setAbaAtiva('meus_tweets')} style={{ fontWeight: abaAtiva === 'meus_tweets' ? '700' : '400' }}>
                  Meus Tweets
                </li>
                <li onClick={() => setUsuarioAtual('')} style={{ color: '#f4212e' }}>
                  Sair (@{usuarioAtual})
                </li>
            </ul>
        </nav>
        <SmallTweetButton onClick={() => setIsModalOpen(true)} />
      </aside>

      <main className="main-content">
        <header className="main-header">
          <h2>{abaAtiva === 'home' ? 'Página Inicial' : `Tweets de @${usuarioAtual}`}</h2> 
        </header>

        {abaAtiva === 'home' && (
          <div className="quick-post-section">
              <button className="quick-tweet-trigger" onClick={() => setIsModalOpen(true)}>
                  O que está acontecendo, {usuarioAtual}?
              </button>
          </div>
        )}

        <div className="timeline">
          {postsExibidos.map((post) => (
            <TweetCard
              key={post.id}
              post={post}
              onPostDeleted={handlePostDeleted}
              onPostUpdated={fetchPosts}
              allowDelete={abaAtiva === 'meus_tweets'}
              // NOVA PROP: Passando o usuário logado para o card
              usuarioAtual={usuarioAtual}
            />
          ))}
        </div>
      </main>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddTweetForm 
          usuarioAtual={usuarioAtual} 
          onTweetAdded={() => {
            fetchPosts();
            setIsModalOpen(false);
            setAbaAtiva('home');
          }}
          onFormSubmit={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default App;