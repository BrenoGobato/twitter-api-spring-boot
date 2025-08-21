package br.com.brenogobato.twitter_api.dto;

import java.util.Date;

import br.com.brenogobato.twitter_api.entities.Post;

public class PostDTO {
    private Long id;
    private Date momentoPost;
    private String conteudoPost;
    private int likes;
    private UsuarioDTO autor;

    public PostDTO(Post entity) {
        this.id = entity.getId();
        this.momentoPost = entity.getMomentoPost();
        this.conteudoPost = entity.getConteudoPost();
        this.likes = entity.getLikes();
        this.autor = new UsuarioDTO(entity.getAutor()); // Convertendo o autor também
    }
    
    // Getters e Setters...
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Date getMomentoPost() { return momentoPost; }
    public void setMomentoPost(Date momentoPost) { this.momentoPost = momentoPost; }
    public String getConteudoPost() { return conteudoPost; }
    public void setConteudoPost(String conteudoPost) { this.conteudoPost = conteudoPost; }
    public int getLikes() { return likes; }
    public void setLikes(int likes) { this.likes = likes; }
    public UsuarioDTO getAutor() { return autor; }
    public void setAutor(UsuarioDTO autor) { this.autor = autor; }
} 