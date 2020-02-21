package cz.marek_b.graphql.hokeyappbackend.dao;

import cz.marek_b.graphql.hokeyappbackend.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerDao extends JpaRepository<Player, Long> {

}
