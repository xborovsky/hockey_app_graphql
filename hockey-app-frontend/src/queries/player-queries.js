import { gql } from 'apollo-boost';

export const GET_PLAYERS_QUERY = gql`
    {
        players {
            id
            name
            number
            team {
                name
            }
            playerPhoto:photo {
                id
                mimeType
                photoBase64
            }
        }
    }
`;

export const GET_PLAYER_DETAIL_QUERY = gql`
    query Player($id: ID!) {
        player(id:$id) {
            id
            name
            number
            team {
                id
                name
                players {
                    id
                    name
                    number
                }
            }
            playerPhoto:photo {
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

export const CREATE_PLAYER_MUTATION = gql`
    mutation CreatePlayer($name: String!, $number : Float, $teamId : ID) {
        addPlayer(name: $name, number : $number, teamId : $teamId) {
            id
            name
            number
        }
    }
`;

export const GET_PLAYER_PHOTO_QUERY = gql`
    query PlayerPhoto($playerId:ID!) {
        playerPhoto(playerId:$playerId) {
            id,
            mimeType,
            photoBase64
        }
    }
`;

export const CREATE_PLAYER_COMMENT_MUTATION = gql`
    mutation CreateComment($playerId:ID!, $commentInput:CommentInput!) {
        createPlayerComment(playerId:$playerId, commentInput:$commentInput) {
            id
            userName
            created
            stars
            comment
        }
    }
`;