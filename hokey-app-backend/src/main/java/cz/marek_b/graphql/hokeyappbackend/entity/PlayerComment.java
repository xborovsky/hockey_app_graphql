package cz.marek_b.graphql.hokeyappbackend.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class PlayerComment extends Comment {

    @ManyToOne
    @JoinColumn(nullable = false)
    private Player player;

    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    @Override
    public String toString() {
        return "PlayerComment{" + "id=" + getId() + ", userName=" + getUserName() + ", created=" + getCreated() + ", stars=" + getStars() + ", player=" + player + '}';
    }


}
