package cz.marek_b.graphql.hokeyappbackend.graphql;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import cz.marek_b.graphql.hokeyappbackend.dao.PlayerCommentDao;
import cz.marek_b.graphql.hokeyappbackend.dao.PlayerDao;
import cz.marek_b.graphql.hokeyappbackend.dao.TeamCommentDao;
import cz.marek_b.graphql.hokeyappbackend.dao.TeamDao;
import cz.marek_b.graphql.hokeyappbackend.entity.Player;
import cz.marek_b.graphql.hokeyappbackend.entity.PlayerComment;
import cz.marek_b.graphql.hokeyappbackend.entity.Team;
import cz.marek_b.graphql.hokeyappbackend.entity.TeamComment;
import cz.marek_b.graphql.hokeyappbackend.graphql.input.CommentInput;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Mutation implements GraphQLMutationResolver {

    @Autowired
    private TeamDao teamDao;
    @Autowired
    private PlayerDao playerDao;
    @Autowired
    private PlayerCommentDao playerCommentDao;
    @Autowired
    private TeamCommentDao teamCommentDao;

    @Transactional
    public Team addTeam(String name) {
        Team team = new Team();
        team.setName(name);
        return teamDao.save(team);
    }

    @Transactional
    public Player addPlayer(String name, Integer number, Long teamId) {
        Player player = new Player();
        player.setName(name);
        player.setNumber(number);

        Team team = teamDao.findById(teamId).orElse(null);
        if (team != null) {
            return assignTeamToPlayer(player, team);
        }

        return playerDao.save(player);
    }

    @Transactional
    public Player assignTeamToPlayer(Long playerId, Long teamId) {
        Player player = playerDao.findById(playerId).orElseThrow(() -> new NullPointerException("Player id=" + playerId + " not found"));
        Team team = teamDao.findById(teamId).orElseThrow(() -> new NullPointerException("Team id=" + teamId + " not found"));

        return assignTeamToPlayer(player, team);
    }

    @Transactional
    public PlayerComment createPlayerComment(Long playerId, CommentInput commentInput) {
        Player player = playerDao.findById(playerId).orElseThrow(() -> new NullPointerException("Player id=" + playerId + " not found"));

        PlayerComment playerComment = new PlayerComment();
        playerComment.setPlayer(player);
        playerComment.setUserName(commentInput.getUserName());
        playerComment.setStars(commentInput.getStars());
        playerComment.setComment(commentInput.getComment());

        return playerCommentDao.save(playerComment);
    }

    @Transactional
    public TeamComment createTeamComment(Long teamId, CommentInput commentInput) {
        Team team = teamDao.findById(teamId).orElseThrow(() -> new NullPointerException("Team id=" + teamId + " not found"));

        TeamComment teamComment = new TeamComment();
        teamComment.setTeam(team);
        teamComment.setUserName(commentInput.getUserName());
        teamComment.setStars(commentInput.getStars());
        teamComment.setComment(commentInput.getComment());

        return teamCommentDao.save(teamComment);
    }

    private Player assignTeamToPlayer(Player player, Team team) {
        player.setTeam(team);
        team.getPlayers().add(player);

        teamDao.save(team);
        return playerDao.save(player);
    }

}
