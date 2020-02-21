package cz.marek_b.graphql.hokeyappbackend.dao;

import cz.marek_b.graphql.hokeyappbackend.entity.Player;
import cz.marek_b.graphql.hokeyappbackend.entity.Team;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TeamDao extends JpaRepository<Team, Long> {

    @Query("SELECT t.players FROM Team t WHERE t.id = ?1")
    List<Player> findAllPlayers(long teamId);

}
