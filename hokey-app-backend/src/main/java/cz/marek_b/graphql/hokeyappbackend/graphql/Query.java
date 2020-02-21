package cz.marek_b.graphql.hokeyappbackend.graphql;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import cz.marek_b.graphql.hokeyappbackend.dao.PlayerDao;
import cz.marek_b.graphql.hokeyappbackend.dao.PlayerPhotoDao;
import cz.marek_b.graphql.hokeyappbackend.dao.TeamDao;
import cz.marek_b.graphql.hokeyappbackend.dao.TeamPhotoDao;
import cz.marek_b.graphql.hokeyappbackend.entity.Player;
import cz.marek_b.graphql.hokeyappbackend.entity.PlayerPhoto;
import cz.marek_b.graphql.hokeyappbackend.entity.Team;
import cz.marek_b.graphql.hokeyappbackend.entity.TeamPhoto;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class Query implements GraphQLQueryResolver {

    @Autowired
    private PlayerDao playerDao;
    @Autowired
    private TeamDao teamDao;
    @Autowired
    private PlayerPhotoDao playerPhotoDao;
    @Autowired
    private TeamPhotoDao teamPhotoDao;

    public List<Player> getPlayers() {
        return playerDao.findAll(Sort.by("name"));
    }

    public Optional<Player> getPlayer(long id) {
        return playerDao.findById(id);
    }

    public List<Team> getTeams() {
        return teamDao.findAll(Sort.by("name"));
    }

    public Optional<Team> getTeam(long id) {
        return teamDao.findById(id);
    }

    public Optional<PlayerPhoto> getPlayerPhoto(Long playerId) {
        Optional<Player> playerMaybe = playerDao.findById(playerId);
        if (playerMaybe.isPresent()) {
            return playerPhotoDao.findByPlayer(playerMaybe.get());
        }
        return Optional.ofNullable(null);
    }

    public Optional<TeamPhoto> getTeamPhoto(Long teamId) {
        Optional<Team> teamMaybe = teamDao.findById(teamId);
        if (teamMaybe.isPresent()) {
            return teamPhotoDao.findByTeam(teamMaybe.get());
        }
        return Optional.ofNullable(null);
    }
}
