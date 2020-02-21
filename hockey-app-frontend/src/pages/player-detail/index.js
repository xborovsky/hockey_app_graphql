import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useRouteMatch } from 'react-router-dom';

import DataFetcher from '../../components/DataFetcher';
import PlayerDetail from './PlayerDetail';
import { GET_PLAYER_DETAIL_QUERY, CREATE_PLAYER_COMMENT_MUTATION } from '../../queries/player-queries';
import Alert from '../../components/alert/Alert';
import CommentForm from '../../components/CommentForm';
import CommentSection from '../../components/CommentSection';

const PlayerDetailPage = () => {
    const match = useRouteMatch();
    const { loading, error, data } = useQuery(GET_PLAYER_DETAIL_QUERY, { variables : { id : match.params.id } });
    const [ photoUploadError, setPhotoUploadError ] = useState(undefined);
    const [ showCommentForm, setShowCommentForm ] = useState(false);
    const [ createPlayerComment, { loading:mutationLoading, error:mutationError } ] = useMutation(CREATE_PLAYER_COMMENT_MUTATION);

    const handleCommentFormSubmit = commentData => {
        createPlayerComment({
            variables : { playerId : match.params.id, commentInput : commentData },
            refetchQueries : [{ query : GET_PLAYER_DETAIL_QUERY, variables : { id : match.params.id } }]
        });
        setShowCommentForm(false);
    }

    return (
        <DataFetcher loading={loading} error={error}>
            { photoUploadError && <Alert type='error'>{ photoUploadError }</Alert> }

            { data && data.player &&
                <PlayerDetail
                    id={+data.player.id}
                    name={data.player.name}
                    number={data.player.number}
                    team={data.player.team}
                    photo={data.player.playerPhoto}
                    onPhotoUploadError={error => setPhotoUploadError(error)}
                />
            }

            <CommentSection
                onAddCommentClicked={() => setShowCommentForm(true)}
                comments={data?.player?.comments || []}
            />

            { showCommentForm &&
                <CommentForm
                    onClose={() => setShowCommentForm(false)}
                    onSubmit={handleCommentFormSubmit}
                    showLoading={mutationLoading}
                    mutationError={mutationError}
                />
            }
        </DataFetcher>
    );
};

export default PlayerDetailPage;