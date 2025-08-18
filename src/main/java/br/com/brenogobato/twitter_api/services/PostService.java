package br.com.brenogobato.twitter_api.services;

import br.com.brenogobato.twitter_api.entities.Post;
import br.com.brenogobato.twitter_api.entities.Usuario;
import br.com.brenogobato.twitter_api.repositories.PostRepository;
import br.com.brenogobato.twitter_api.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    // 1. Injetando as dependências (os "controles remotos" do banco)
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // 2. Método para listar todos os posts
    public List<Post> listarTodos() {
        return postRepository.findAll();
    }

    // 3. Método para criar um novo post
    public Post criarPost(String titulo, String conteudo, String nomeAutor) {
        // Lógica para encontrar o usuário ou criar um novo se não existir
        Optional<Usuario> usuarioExistente = usuarioRepository.findByNome(nomeAutor);
        Usuario autor = usuarioExistente.orElseGet(() -> usuarioRepository.save(new Usuario(nomeAutor)));

        // Cria o novo objeto Post
        Post novoPost = new Post();
        novoPost.setTituloPost(titulo);
        novoPost.setConteudoPost(conteudo);
        novoPost.setAutor(autor);
        novoPost.setMomentoPost(new Date()); // Define a data e hora atual
        novoPost.setLikes(0);

        // Salva o post no banco de dados e o retorna
        return postRepository.save(novoPost);
    }
}