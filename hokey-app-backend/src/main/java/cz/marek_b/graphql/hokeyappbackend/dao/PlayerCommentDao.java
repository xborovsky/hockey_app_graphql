package cz.marek_b.graphql.hokeyappbackend.dao;

import cz.marek_b.graphql.hokeyappbackend.entity.Player;
import cz.marek_b.graphql.hokeyappbackend.entity.PlayerComment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PlayerCommentDao extends JpaRepository<PlayerComment, Long> {

    @Query("SELECT pc FROM PlayerComment pc WHERE pc.player = ?1")
    List<PlayerComment> findAllByPlayer(Player player);

}
