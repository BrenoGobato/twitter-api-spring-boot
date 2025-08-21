package br.com.brenogobato.twitter_api.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.brenogobato.twitter_api.entities.Comentario;
import br.com.brenogobato.twitter_api.repositories.ComentarioRepository;
import br.com.brenogobato.twitter_api.services.ComentarioService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping(value = "/posts/{postId}/comentarios")
public class ComentarioController {

    @Autowired
    private ComentarioService comentarioService;

    @Autowired // Adicione esta injeção do repositório
    private ComentarioRepository comentarioRepository;

    // GET - Buscar todos comentários de um post
    @GetMapping
    public ResponseEntity<List<Comentario>> getComentariosPorPost(@PathVariable Long postId) {
        // Use o repositório diretamente enquanto o service não funciona
        List<Comentario> comentarios = comentarioRepository.findByPostId(postId);
        return ResponseEntity.ok(comentarios);
    }

    // POST - Criar novo comentário
    @PostMapping
    public ResponseEntity<Comentario> criarComentario(
            @PathVariable Long postId, 
            @RequestBody Map<String, String> payload
    ) {
        String texto = payload.get("textoComentario");
        String nomeAutor = payload.get("nomeAutor");
        Comentario novoComentario = comentarioService.criarComentario(postId, texto, nomeAutor);
        return ResponseEntity.status(201).body(novoComentario);
    }
}