package br.com.brenogobato.twitter_api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.brenogobato.twitter_api.entities.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
    // Por enquanto, os métodos padrão do JpaRepository são suficientes.
}