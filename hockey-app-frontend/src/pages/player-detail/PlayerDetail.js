import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import { useLazyQuery } from '@apollo/react-hooks';

import PhotoUploader from '../../components/PhotoUploader';
import { GET_PLAYER_PHOTO_QUERY } from '../../queries/player-queries';

const useStyles = makeStyles(theme => ({
    photo : {
        width : 350
    }
}));

const PlayerDetail = ({ id, name, number, team, photo, onPhotoUploadError }) => {
    const classes = useStyles();
    const [ getPhoto, { loading, data } ] = useLazyQuery(GET_PLAYER_PHOTO_QUERY, { fetchPolicy: "network-only" });

    return (
        <>
            <Card className={classes.card}>
                <Grid container spacing={4}>
                    <Grid item xs={2}>
                        <PhotoUploader
                            photo={data?.playerPhoto || photo}
                            photoUploadUrl={`http://localhost:8088/api/photo/player/${id}`}
                            onUploadError={onPhotoUploadError}
                            loading={loading}
                            onRefetchPhoto={() => getPhoto({ variables : { playerId : id } })}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <CardContent>
                            <Typography variant="h5" component="h1">
                                { name } - { number || '?' }
                            </Typography>
                            { team &&
                                <Typography variant="h6" component="h2">
                                    { team.name }
                                </Typography>
                            }
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>

        </>
    );
};

PlayerDetail.propTypes = {
    id : PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.number,
    team: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        name: PropTypes.string.isRequired,
        players: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
                name: PropTypes.string.isRequired,
                number: PropTypes.number
            })
        ).isRequired
    }),
    photo : PropTypes.shape({
        id : PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        mimeType : PropTypes.string.isRequired,
        photoBase64 : PropTypes.string.isRequired
    }),
    onPhotoUploadError : PropTypes.func.isRequired
};

export default PlayerDetail;