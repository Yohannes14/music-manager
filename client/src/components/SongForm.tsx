import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Song } from '../types';
import styled from '@emotion/styled';
import { useAppSelector } from '../store/configureStore';
import { addSongStart, updateSongStart } from '../redux/songsSlice';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  margin-top: 16px;
  justify-content: center;
  align-items: center;
`;

const InputField = styled.input`
  width: 70%;
  padding: 10px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
  font-family: Poppins;
  font-size: 16px;
  line-height: 23px;
  letter-spacing: 0em;
`;

const ErrorText = styled.div`
  color: red;
  margin-top: 5px;
  font-size:10px;
  text-align: left;
`;

const AddButton = styled.button`
  width: 75%;
  background-color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 10px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  opacity: 0.9;
  font-family: Poppins;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: 0em;
`;

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    artist: Yup.string().required('Artist is required'),
    album: Yup.string().required('Album is required'),
    genre: Yup.string().required('Genre is required'),
});

const SongForm: React.FC<{ onSubmit: () => void; initialSongId: string | null }> = ({ onSubmit, initialSongId }) => {
    const dispatch = useDispatch();
    const { songs, error, loading } = useAppSelector((state) => state.songs);

    const [formData, setFormData] = useState<Song>({
        _id: '',
        title: '',
        artist: '',
        album: '',
        genre: '',
    });

    useEffect(() => {
        if (initialSongId) {
            const initialSong = songs.find((song) => song._id === initialSongId);
            if (initialSong) {
                setFormData(initialSong);
                formik.setValues({
                    title: initialSong.title,
                    artist: initialSong.artist,
                    album: initialSong.album,
                    genre: initialSong.genre,
                });
            }
        }
    }, [initialSongId, songs]);
    const formik = useFormik({
        initialValues: {
            title: formData.title,
            artist: formData.artist,
            album: formData.album,
            genre: formData.genre,
        },
        validationSchema: validationSchema,
        onSubmit: (data) => {
            if (initialSongId) {
                // Update existing song
                const values = { _id: initialSongId, ...data }
                dispatch(updateSongStart(values));
            } else {
                // Add new song
                const values = {
                    _id: '',
                    ...data
                }
                dispatch(addSongStart(values));
            }
            if (!error && !loading) {
                onSubmit();

            }
        },
    });

    return (
        <FormContainer onSubmit={formik.handleSubmit}>
            <InputField
                type="text"
                placeholder="Title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title && <ErrorText>{formik.errors.title}</ErrorText>}

            <InputField
                type="text"
                placeholder="Artist"
                name="artist"
                value={formik.values.artist}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.artist && formik.errors.artist && <ErrorText>{formik.errors.artist}</ErrorText>}

            <InputField
                type="text"
                placeholder="Album"
                name="album"
                value={formik.values.album}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.album && formik.errors.album && <ErrorText>{formik.errors.album}</ErrorText>}

            <InputField
                type="text"
                placeholder="Genre"
                name="genre"
                value={formik.values.genre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.genre && formik.errors.genre && <ErrorText>{formik.errors.genre}</ErrorText>}

            <AddButton type="submit">{loading ? "Loading" : initialSongId ? 'Update Song' : 'Add New Song'}</AddButton>

        </FormContainer>
    );
};

export default SongForm;
