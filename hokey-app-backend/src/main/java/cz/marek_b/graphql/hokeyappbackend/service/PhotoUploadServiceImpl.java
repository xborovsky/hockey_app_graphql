package cz.marek_b.graphql.hokeyappbackend.service;

import cz.marek_b.graphql.hokeyappbackend.dao.PlayerPhotoDao;
import cz.marek_b.graphql.hokeyappbackend.dao.TeamPhotoDao;
import cz.marek_b.graphql.hokeyappbackend.entity.Player;
import cz.marek_b.graphql.hokeyappbackend.entity.PlayerPhoto;
import cz.marek_b.graphql.hokeyappbackend.entity.Team;
import cz.marek_b.graphql.hokeyappbackend.entity.TeamPhoto;
import java.io.IOException;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class PhotoUploadServiceImpl implements PhotoUploadService {

    @Autowired
    private PlayerPhotoDao playerPhotoDao;
    @Autowired
    private TeamPhotoDao teamPhotoDao;

    @Override
    @Transactional
    public PlayerPhoto upload(Player player, MultipartFile file) throws IOException {
        Optional<PlayerPhoto> playerPhotoMaybe = playerPhotoDao.findByPlayer(player);
        PlayerPhoto photo = playerPhotoMaybe.isPresent() ? playerPhotoMaybe.get() : new PlayerPhoto();
        photo.setPlayer(player);
        photo.setPhoto(file.getBytes());
        photo.setMimeType(file.getContentType());

        return playerPhotoDao.save(photo);
    }

    @Override
    @Transactional
    public TeamPhoto upload(Team team, MultipartFile file) throws IOException {
        Optional<TeamPhoto> teamPhotoMaybe = teamPhotoDao.findByTeam(team);
        TeamPhoto photo = teamPhotoMaybe.isPresent() ? teamPhotoMaybe.get() : new TeamPhoto();
        photo.setTeam(team);
        photo.setPhoto(file.getBytes());
        photo.setMimeType(file.getContentType());

        return teamPhotoDao.save(photo);
    }

}
