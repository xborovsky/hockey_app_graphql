import { gql } from 'apollo-boost';

export const GET_TEAMS_QUERY = gql`
    {
        teams {
            id
            name
            teamPhoto:photo {
                id
                mimeType
                photoBase64
            }
        }
    }
`;

export const GET_TEAM_DETAIL_QUERY = gql`
    query Team($id:ID!) {
        team(id:$id) {
            id
            name
            players {
                id
                name
                number
                playerPhoto:photo {
                    id
                    mimeType
                    photoBase64
                }
            }
            teamPhoto:photo {
                id
                mimeType
                photoBase64
            }
            comments {
                id
                userName
                created
                stars
                comment
            }
        }
    }
`;

export const CREATE_TEAM_MUTATION = gql`
    mutation CreateTeam($name: String!) {
        addTeam(name: $name) {
            id
            name
        }
    }
`;

export const GET_TEAM_PHOTO_QUERY = gql`
    query TeamPhoto($teamId:ID!) {
        teamPhoto(teamId:$teamId) {
            id,
            mimeType,
            photoBase64
        }
    }
`;

export const CREATE_TEAM_COMMENT_MUTATION = gql`
    mutation CreateComment($teamId:ID!, $commentInput:CommentInput!) {
        createTeamComment(teamId:$teamId, commentInput:$commentInput) {
            id
            userName
            created
            stars
            comment
        }
    }
`;