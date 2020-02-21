import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles, Avatar, CircularProgress } from '@material-ui/core';
import axios from 'axios';

import { getBase64Format } from '../utils/base64-util';

const useStyles = makeStyles(theme => ({
    photo : {
        width : '90%',
        height : '95%',
        margin : '2.5% 5%',
        cursor : 'pointer'
    },
    loader : {
        display : 'block',
        margin : '30px auto'
    },
    fileInputNative : {
        display : 'none'
    }
}));

const PhotoUploader = ({
    photo,
    photoUploadUrl,
    onUploadError,
    loading,
    onRefetchPhoto
}) => {
    const classes = useStyles();
    const fileInputNativeRef = useRef();
    const [ showPhotoUploadLoader, setShowPhotoUploadLoader ] = useState(false);

    const handlePhotoUpload = event => {
        onUploadError(undefined);
        setShowPhotoUploadLoader(true);

        const formData = new FormData();
        formData.append('file', event.target.files[0]);

        axios({
            url : photoUploadUrl,
            method : 'PUT',
            data : formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(_res => {
            onRefetchPhoto();
            setShowPhotoUploadLoader(false);
        })
        .catch(_err => onUploadError('Could not upload photo! Try again later...'));
    };

    return (
        <>
            {
                loading || showPhotoUploadLoader ?
                    <CircularProgress className={classes.loader} /> :
                        photo ?
                            <CardMedia
                                image={getBase64Format(photo.mimeType, photo.photoBase64)}
                                className={classes.photo}
                                onClick={() => fileInputNativeRef.current.click()}
                                component="img"
                            /> :
                            <Avatar className={classes.photo} onClick={() => fileInputNativeRef.current.click()} />
            }
            <input
                type="file"
                className={classes.fileInputNative}
                ref={fileInputNativeRef}
                onChange={handlePhotoUpload}
                accept="image/*"
            />
        </>
    );

};

PhotoUploader.propTypes = {
    photo : PropTypes.shape({
        id : PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        mimeType : PropTypes.string.isRequired,
        photoBase64 : PropTypes.string.isRequired
    }),
    photoUploadUrl : PropTypes.string.isRequired,
    onUploadError : PropTypes.func.isRequired,
    loading : PropTypes.bool.isRequired,
    onRefetchPhoto : PropTypes.func.isRequired
};

export default PhotoUploader;