package br.com.brenogobato.twitter_api.services;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.brenogobato.twitter_api.dto.PostDTO;
import br.com.brenogobato.twitter_api.entities.Post;
import br.com.brenogobato.twitter_api.entities.Usuario;
import br.com.brenogobato.twitter_api.repositories.PostRepository;
import br.com.brenogobato.twitter_api.repositories.UsuarioRepository;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Transactional(readOnly = true)
    public List<PostDTO> listarTodos() {
        List<Post> listaDePosts = postRepository.findAll();
        return listaDePosts.stream().map(PostDTO::new).collect(Collectors.toList());
    }

    @Transactional
    public PostDTO criarPost(String conteudo, String nomeAutor) {
        Usuario autor = usuarioRepository.findByNome(nomeAutor)
                .orElseGet(() -> usuarioRepository.save(new Usuario(nomeAutor)));

        Post novoPost = new Post();
        novoPost.setConteudoPost(conteudo);
        novoPost.setAutor(autor);
        novoPost.setMomentoPost(new Date());
        novoPost.setLikes(0);

        autor.getPosts().add(novoPost);

        novoPost = postRepository.save(novoPost);
        return new PostDTO(novoPost);
    }

    @Transactional
    public void deletarPost(Long id) {
        if (!postRepository.existsById(id)) {
            throw new RuntimeException("Post não encontrado com id: " + id);
        }
        postRepository.deleteById(id);
    }

    @Transactional
    public PostDTO incrementarLike(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post não encontrado com id: " + id));
        post.setLikes(post.getLikes() + 1);
        Post postSalvo = postRepository.save(post);
        return new PostDTO(postSalvo);
    }
}
