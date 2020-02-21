import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useRouteMatch } from 'react-router-dom';

import DataFetcher from '../../components/DataFetcher';
import TeamDetail from './TeamDetail';
import { GET_TEAM_DETAIL_QUERY, CREATE_TEAM_COMMENT_MUTATION } from '../../queries/team-queries';
import PlayersList from '../../components/players-list/PlayersList';
import Alert from '../../components/alert/Alert';
import CommentForm from '../../components/CommentForm';
import CommentSection from '../../components/CommentSection';

const TeamDetailPage = () => {
    const match = useRouteMatch();
    const { loading, error, data } = useQuery(GET_TEAM_DETAIL_QUERY, { variables : { id : match.params.id } });
    const [ photoUploadError, setPhotoUploadError ] = useState(undefined);
    const [ showCommentForm, setShowCommentForm ] = useState(false);
    const [ createTeamComment, { loading:mutationLoading, error:mutationError } ] = useMutation(CREATE_TEAM_COMMENT_MUTATION);

    const handleCommentFormSubmit = commentData => {
        createTeamComment({
            variables : { teamId : match.params.id, commentInput : commentData },
            refetchQueries : [{ query : GET_TEAM_DETAIL_QUERY, variables : { id : match.params.id } }]
        });
        setShowCommentForm(false);
    }

    return (
        <DataFetcher loading={loading} error={error}>
            { photoUploadError && <Alert type='error'>{ photoUploadError }</Alert> }

            { data && data.team &&
                <>
                    <TeamDetail
                        id={+data.team.id}
                        name={data.team.name}
                        photo={data.team.teamPhoto}
                        onPhotoUploadError={error => setPhotoUploadError(error)}
                    />
                    { data.team.players &&
                        <PlayersList players={data.team.players} />
                    }
                </>
            }

            <CommentSection
                onAddCommentClicked={() => setShowCommentForm(true)}
                comments={data?.team?.comments || []}
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

export default TeamDetailPage;