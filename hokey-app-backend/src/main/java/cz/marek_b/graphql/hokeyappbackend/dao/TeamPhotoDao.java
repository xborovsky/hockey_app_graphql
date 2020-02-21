package cz.marek_b.graphql.hokeyappbackend.dao;

import cz.marek_b.graphql.hokeyappbackend.entity.Team;
import cz.marek_b.graphql.hokeyappbackend.entity.TeamPhoto;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TeamPhotoDao extends JpaRepository<TeamPhoto, Long> {

    @Query("SELECT tp FROM TeamPhoto tp WHERE tp.team=?1")
    Optional<TeamPhoto> findByTeam(Team team);

}
