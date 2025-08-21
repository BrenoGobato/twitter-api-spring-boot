package br.com.brenogobato.twitter_api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.brenogobato.twitter_api.entities.Comentario;
import br.com.brenogobato.twitter_api.entities.Post;
import br.com.brenogobato.twitter_api.entities.Usuario;
import br.com.brenogobato.twitter_api.repositories.ComentarioRepository;
import br.com.brenogobato.twitter_api.repositories.PostRepository;
import br.com.brenogobato.twitter_api.repositories.UsuarioRepository;

@Service
public class ComentarioService {

    @Autowired
    private ComentarioRepository comentarioRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Transactional
    public Comentario criarComentario(Long postId, String textoComentario, String nomeAutor) {
        // Encontra o Post ao qual o comentário pertence
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post não encontrado"));

        // Encontra ou cria o autor do comentário
        Usuario autor = usuarioRepository.findByNome(nomeAutor)
                .orElseGet(() -> usuarioRepository.save(new Usuario(nomeAutor)));

        // Cria o novo comentário
        Comentario novoComentario = new Comentario();
        novoComentario.setTextoComentario(textoComentario);
        novoComentario.setPost(post);
        novoComentario.setAutor(autor);

        return comentarioRepository.save(novoComentario);
    }

    public List<Comentario> buscarComentariosPorPost(Long postId) {
        return comentarioRepository.findByPostId(postId);
    }
}