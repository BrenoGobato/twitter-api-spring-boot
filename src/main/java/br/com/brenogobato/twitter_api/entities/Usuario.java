package br.com.brenogobato.twitter_api.entities;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;

    // --- ADICIONADO AQUI ---
    // mappedBy = "autor" diz: "A outra ponta desta relação está no campo 'autor' da classe Post"
    // cascade = CascadeType.ALL: Se eu salvar/deletar um usuário, salve/delete seus posts junto.
    // orphanRemoval = true: Se eu remover um post da lista, ele deve ser deletado do banco.
    @OneToMany(mappedBy = "autor", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Post> posts = new ArrayList<>();
    // -------------------------

    // Construtores, Getters e Setters
    public Usuario() {}
    public Usuario(String nome) { this.nome = nome; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public List<Post> getPosts() { return posts; } // Getter para a lista
    public void setPosts(List<Post> posts) { this.posts = posts; } // Setter para a lista
}