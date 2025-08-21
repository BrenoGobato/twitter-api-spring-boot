package br.com.brenogobato.twitter_api.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_comentarios")
public class Comentario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String textoComentario;

    @ManyToOne // Muitos Comentários para Um Usuário
    @JoinColumn(name = "usuario_id")
    private Usuario autor;

    @ManyToOne // Muitos Comentários para Um Post
    @JoinColumn(name = "post_id")
    @JsonBackReference
    private Post post;

    // Construtores, Getters e Setters...
    public Comentario() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTextoComentario() { return textoComentario; }
    public void setTextoComentario(String textoComentario) { this.textoComentario = textoComentario; }
    public Usuario getAutor() { return autor; }
    public void setAutor(Usuario autor) { this.autor = autor; }
    public Post getPost() { return post; }
    public void setPost(Post post) { this.post = post; }
}