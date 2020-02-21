package cz.marek_b.graphql.hokeyappbackend.rest;

import cz.marek_b.graphql.hokeyappbackend.dao.PlayerDao;
import cz.marek_b.graphql.hokeyappbackend.dao.TeamDao;
import cz.marek_b.graphql.hokeyappbackend.entity.Player;
import cz.marek_b.graphql.hokeyappbackend.entity.Team;
import cz.marek_b.graphql.hokeyappbackend.service.PhotoUploadService;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/photo")
public class PhotoController {

    @Autowired
    private PlayerDao playerDao;
    @Autowired
    private TeamDao teamDao;
    @Autowired
    private PhotoUploadService photoUploadService;

    @PutMapping(value = "/player/{playerId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void uploadPlayerPhoto(@PathVariable Long playerId, @RequestParam("file") MultipartFile file) throws IOException {
        Player player = playerDao.findById(playerId)
            .orElseThrow(() -> new NullPointerException("Player id=" + playerId + " does not exist!"));
        photoUploadService.upload(player, file);
    }

    @PutMapping(value = "/team/{teamId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void uploadTeamPhoto(@PathVariable Long teamId, @RequestParam("file") MultipartFile file) throws IOException {
        Team team = teamDao.findById(teamId)
            .orElseThrow(() -> new NullPointerException("Team id=" + teamId + " does not exist!"));
        photoUploadService.upload(team, file);
    }

    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<?> handleNullPointerException(NullPointerException ex) {
        return ResponseEntity.notFound().build();
    }

}
