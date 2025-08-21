package br.com.brenogobato.twitter_api.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.brenogobato.twitter_api.entities.Comentario;

@Repository
public interface ComentarioRepository extends JpaRepository<Comentario, Long> {
    
    // NOVO MÉTODO - Adicione este
    List<Comentario> findByPostId(Long postId);
}