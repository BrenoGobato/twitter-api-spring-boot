package br.com.brenogobato.twitter_api.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.brenogobato.twitter_api.entities.Post;
import br.com.brenogobato.twitter_api.services.PostService;

@CrossOrigin(origins = "http://localhost:5173") 
@RestController
@RequestMapping(value = "/posts") // 1. Define o endereço base para todos os endpoints nesta classe
public class PostController {

    @Autowired // 2. Injeta nosso serviço de lógica de negócio
    private PostService postService;

    // 3. Endpoint para buscar todos os posts (GET /posts)
    @GetMapping
    public ResponseEntity<List<Post>> listarTodos() {
        List<Post> listaDePosts = postService.listarTodos();
        return ResponseEntity.ok().body(listaDePosts);
    }

    // 4. Endpoint para criar um novo post (POST /posts)
    @PostMapping
    public ResponseEntity<Post> criarPost(@RequestBody Map<String, String> payload) {
        String titulo = payload.get("titulo");
        String conteudo = payload.get("conteudo");
        String nomeAutor = payload.get("nomeAutor");

        Post novoPost = postService.criarPost(titulo, conteudo, nomeAutor);
        return ResponseEntity.status(201).body(novoPost); // Retorna 201 Created
    }
}