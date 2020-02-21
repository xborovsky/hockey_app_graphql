import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useLazyQuery } from '@apollo/react-hooks';

import { GET_TEAM_PHOTO_QUERY } from '../../queries/team-queries';
import PhotoUploader from '../../components/PhotoUploader';

const useStyles = makeStyles(theme => ({
    root : {
        marginBottom : '2rem'
    }
}));

const TeamDetail = ({ id, name, photo, onPhotoUploadError}) => {
    const classes = useStyles();
    const [ getPhoto, { loading, data } ] = useLazyQuery(GET_TEAM_PHOTO_QUERY, { fetchPolicy: "network-only" });

    return (
        <Card className={classes.root}>
            <Grid container spacing={4}>
                <Grid item xs={2}>
                    <PhotoUploader
                        photo={data?.teamPhoto || photo}
                        photoUploadUrl={`http://localhost:8088/api/photo/team/${id}`}
                        onUploadError={onPhotoUploadError}
                        loading={loading}
                        onRefetchPhoto={() => getPhoto({ variables : { teamId : id } })}
                    />
                </Grid>
                <Grid item xs={10}>
                    <CardContent>
                        <Typography variant="h5" component="h1">
                            { name }
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    );
};

TeamDetail.propTypes = {
    id : PropTypes.number.isRequired,
    name : PropTypes.string.isRequired,
    photo : PropTypes.shape({
        id : PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        mimeType : PropTypes.string.isRequired,
        photoBase64 : PropTypes.string.isRequired
    }),
    onPhotoUploadError : PropTypes.func.isRequired
};

export default TeamDetail;