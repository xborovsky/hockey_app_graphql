package cz.marek_b.graphql.hokeyappbackend.dao;

import cz.marek_b.graphql.hokeyappbackend.entity.Team;
import cz.marek_b.graphql.hokeyappbackend.entity.TeamComment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TeamCommentDao extends JpaRepository<TeamComment, Long> {

    @Query("SELECT tc FROM TeamComment tc WHERE tc.team= ?1")
    List<TeamComment> findAllByTeam(Team team);

}
