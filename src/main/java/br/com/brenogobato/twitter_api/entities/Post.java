package br.com.brenogobato.twitter_api.entities;

import java.util.ArrayList;
import java.util.Date;
import java.util.List; // Garante que temos todos os imports de persistência

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date momentoPost;
    private String conteudoPost;
    private int likes;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    @JsonBackReference
    private Usuario autor;

    // Ajuste final na anotação @OneToMany
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<Comentario> comentarios = new ArrayList<>();

    // Construtores, Getters e Setters...
    public Post() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Date getMomentoPost() { return momentoPost; }
    public void setMomentoPost(Date momentoPost) { this.momentoPost = momentoPost; }
    public String getConteudoPost() { return conteudoPost; }
    public void setConteudoPost(String conteudoPost) { this.conteudoPost = conteudoPost; }
    public int getLikes() { return likes; }
    public void setLikes(int likes) { this.likes = likes; }
    public Usuario getAutor() { return autor; }
    public void setAutor(Usuario autor) { this.autor = autor; }
    public List<Comentario> getComentarios() { return comentarios; }
    public void setComentarios(List<Comentario> comentarios) { this.comentarios = comentarios; }
}