package br.com.brenogobato.twitter_api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.brenogobato.twitter_api.entities.Comentario;

public interface ComentarioRepository extends JpaRepository<Comentario, Long> {
    // Por enquanto, os métodos padrão do JpaRepository são suficientes.
}