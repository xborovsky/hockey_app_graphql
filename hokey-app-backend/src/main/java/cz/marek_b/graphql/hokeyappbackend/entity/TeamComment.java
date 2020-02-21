package cz.marek_b.graphql.hokeyappbackend.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class TeamComment extends Comment {

    @ManyToOne
    @JoinColumn(nullable = false)
    private Team team;

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    @Override
    public String toString() {
        return "TeamComment{" + "id=" + getId() + ", userName=" + getUserName() + ", created=" + getCreated() + ", stars=" + getStars() + ", team=" + team + '}';
    }



}
