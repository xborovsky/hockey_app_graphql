package cz.marek_b.graphql.hokeyappbackend.graphql.resolver;

import com.coxautodev.graphql.tools.GraphQLResolver;
import cz.marek_b.graphql.hokeyappbackend.dao.TeamCommentDao;
import cz.marek_b.graphql.hokeyappbackend.dao.TeamDao;
import cz.marek_b.graphql.hokeyappbackend.dao.TeamPhotoDao;
import cz.marek_b.graphql.hokeyappbackend.entity.Player;
import cz.marek_b.graphql.hokeyappbackend.entity.Team;
import cz.marek_b.graphql.hokeyappbackend.entity.TeamComment;
import cz.marek_b.graphql.hokeyappbackend.entity.TeamPhoto;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TeamResolver implements GraphQLResolver<Team> {

    @Autowired
    private TeamDao teamDao;
    @Autowired
    private TeamPhotoDao teamPhotoDao;
    @Autowired
    private TeamCommentDao teamCommentDao;

    @Transactional(readOnly = true)
    public List<Player> getPlayers(Team team) {
        return teamDao.findAllPlayers(team.getId());
    }

    public Optional<TeamPhoto> getPhoto(Team team) {
        return teamPhotoDao.findByTeam(team);
    }

    public List<TeamComment> getComments(Team team) {
        return teamCommentDao.findAllByTeam(team);
    }

}
