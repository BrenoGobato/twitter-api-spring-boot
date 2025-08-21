package br.com.brenogobato.twitter_api.dto;

import br.com.brenogobato.twitter_api.entities.Usuario;

public class UsuarioDTO {
    private Long id;
    private String nome;

    public UsuarioDTO(Usuario entity) {
        this.id = entity.getId();
        this.nome = entity.getNome();
    }
    
    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
}