package cz.marek_b.graphql.hokeyappbackend.graphql.resolver;

import com.coxautodev.graphql.tools.GraphQLResolver;
import cz.marek_b.graphql.hokeyappbackend.dao.PlayerCommentDao;
import cz.marek_b.graphql.hokeyappbackend.dao.PlayerPhotoDao;
import cz.marek_b.graphql.hokeyappbackend.dao.TeamDao;
import cz.marek_b.graphql.hokeyappbackend.entity.Player;
import cz.marek_b.graphql.hokeyappbackend.entity.PlayerComment;
import cz.marek_b.graphql.hokeyappbackend.entity.PlayerPhoto;
import cz.marek_b.graphql.hokeyappbackend.entity.Team;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlayerResolver implements GraphQLResolver<Player> {

    @Autowired
    private TeamDao teamDao;
    @Autowired
    private PlayerPhotoDao playerPhotoDao;
    @Autowired
    private PlayerCommentDao playerCommentDao;

    public Team getTeam(Player player) {
        if (player.getTeam() != null) {
            return teamDao.findById(player.getTeam().getId()).orElse(null);
        }
        return null;
    }

    public Optional<PlayerPhoto> getPhoto(Player player) {
        return playerPhotoDao.findByPlayer(player);
    }

    public List<PlayerComment> getComments(Player player) {
        return playerCommentDao.findAllByPlayer(player);
    }

}
