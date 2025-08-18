package br.com.brenogobato.twitter_api.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.brenogobato.twitter_api.entities.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Spring Data JPA vai criar magicamente um método para buscar um usuário pelo nome
    Optional<Usuario> findByNome(String nome);
}