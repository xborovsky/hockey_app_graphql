package cz.marek_b.graphql.hokeyappbackend.dao;

import cz.marek_b.graphql.hokeyappbackend.entity.Player;
import cz.marek_b.graphql.hokeyappbackend.entity.PlayerPhoto;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PlayerPhotoDao extends JpaRepository<PlayerPhoto, Long> {

    @Query("SELECT pp FROM PlayerPhoto pp WHERE pp.player=?1")
    Optional<PlayerPhoto> findByPlayer(Player player);

}
