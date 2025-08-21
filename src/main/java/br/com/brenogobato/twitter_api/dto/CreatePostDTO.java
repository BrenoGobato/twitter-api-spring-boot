package br.com.brenogobato.twitter_api.dto;

public class CreatePostDTO {
    private String conteudo;
    private String nomeAutor;

    // Getters e Setters (importante para o Jackson/Spring mapear o JSON)
    public String getConteudo() {
        return conteudo;
    }
    public void setConteudo(String conteudo) {
        this.conteudo = conteudo;
    }
    public String getNomeAutor() {
        return nomeAutor;
    }
    public void setNomeAutor(String nomeAutor) {
        this.nomeAutor = nomeAutor;
    }
}