package br.com.brenogobato.twitter_api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.brenogobato.twitter_api.dto.CreatePostDTO;
import br.com.brenogobato.twitter_api.dto.PostDTO;
import br.com.brenogobato.twitter_api.services.PostService;

@CrossOrigin(origins = {"http://localhost:5173", "https://twitter-api-tau.vercel.app"})
@RestController
@RequestMapping(value = "/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping
    public ResponseEntity<List<PostDTO>> listarTodos() {
        List<PostDTO> lista = postService.listarTodos();
        return ResponseEntity.ok(lista);
    }

    @PostMapping
    public ResponseEntity<PostDTO> criarPost(@RequestBody CreatePostDTO createPostDTO) {
        PostDTO novoPost = postService.criarPost(createPostDTO.getConteudo(), createPostDTO.getNomeAutor());
        return ResponseEntity.status(HttpStatus.CREATED).body(novoPost);
    }

    @PatchMapping("/{id}/like")
    public ResponseEntity<PostDTO> incrementarLike(@PathVariable Long id) {
        PostDTO postAtualizado = postService.incrementarLike(id);
        return ResponseEntity.ok(postAtualizado);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletarPost(@PathVariable Long id) {
        postService.deletarPost(id);
    }
}
