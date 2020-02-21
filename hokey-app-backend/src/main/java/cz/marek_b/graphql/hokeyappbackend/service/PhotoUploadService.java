package cz.marek_b.graphql.hokeyappbackend.service;

import cz.marek_b.graphql.hokeyappbackend.entity.Player;
import cz.marek_b.graphql.hokeyappbackend.entity.PlayerPhoto;
import cz.marek_b.graphql.hokeyappbackend.entity.Team;
import cz.marek_b.graphql.hokeyappbackend.entity.TeamPhoto;
import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;

public interface PhotoUploadService {

    PlayerPhoto upload(Player player, MultipartFile file) throws IOException;

    TeamPhoto upload(Team team, MultipartFile file) throws IOException;

}
