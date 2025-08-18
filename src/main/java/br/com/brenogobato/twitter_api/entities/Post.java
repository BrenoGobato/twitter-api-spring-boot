package br.com.brenogobato.twitter_api.entities;

import jakarta.persistence.*;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tb_posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date momentoPost;
    private String tituloPost;
    private String conteudoPost;
    private int likes;

    @ManyToOne // Muitos Posts para Um Usuário
    @JoinColumn(name = "usuario_id")
    private Usuario autor;

    @OneToMany(mappedBy = "post") // Um Post para Muitos Comentários
    private List<Comentario> comentarios = new ArrayList<>();

    // Construtores, Getters e Setters...
    // (Você pode gerar automaticamente na sua IDE ou copiar daqui)
    public Post() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Date getMomentoPost() { return momentoPost; }
    public void setMomentoPost(Date momentoPost) { this.momentoPost = momentoPost; }
    public String getTituloPost() { return tituloPost; }
    public void setTituloPost(String tituloPost) { this.tituloPost = tituloPost; }
    public String getConteudoPost() { return conteudoPost; }
    public void setConteudoPost(String conteudoPost) { this.conteudoPost = conteudoPost; }
    public int getLikes() { return likes; }
    public void setLikes(int likes) { this.likes = likes; }
    public Usuario getAutor() { return autor; }
    public void setAutor(Usuario autor) { this.autor = autor; }
    public List<Comentario> getComentarios() { return comentarios; }
    public void setComentarios(List<Comentario> comentarios) { this.comentarios = comentarios; }
}