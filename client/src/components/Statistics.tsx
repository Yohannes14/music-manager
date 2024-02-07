import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import { CiMusicNote1, CiUser } from 'react-icons/ci'
import { MdOutlineAlbum, MdOutlineKeyboardVoice } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector } from '../store/configureStore';
import { getStatisticsStart } from '../redux/statistics';
const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const Text = styled.h1`
    font-family: Poppins;
    font-size: 20px;
    font-weight: 600;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    color: #FFFFFF;

`;

const Statistics = () => {
    const dispatch = useDispatch();
    const { totalSongs, totalArtists, totalAlbums, totalGenres} = useAppSelector((state) => state.stat);
    useEffect(() => {
        dispatch(getStatisticsStart());

    }, [dispatch]);
    return (
        <Container>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', placeItems:'flex-start' }}>
                <CiUser size={30} color='#FFFFFF' style={{marginTop: '18px'}} />
                <div>
                    <Text>Artists</Text>
                    <Text style={{ color: '#00ABF4', fontSize: '18px' }}>{totalArtists || 0}</Text>
                </div>

            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', placeItems:'flex-start' }}>
                <CiMusicNote1 size={30} color='#FFFFFF' style={{marginTop: '18px'}}/>
                <div>
                    <Text>Songs</Text>
                    <Text style={{ color: '#00ABF4', fontSize: '18px' }}>{totalSongs || 0}</Text>
                </div>

            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' ,placeItems:'flex-start' }}>
                <MdOutlineAlbum size={30} color='#FFFFFF' style={{marginTop: '18px'}}/>
                <div>
                    <Text>Album</Text>
                    <Text style={{ color: '#00ABF4', fontSize: '18px' }}>{totalAlbums || 0}</Text>
                </div>

            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', placeItems:'flex-start' }}>
                <MdOutlineKeyboardVoice size={30} color='#FFFFFF' style={{marginTop: '18px'}} />
                <div>
                    <Text>Genres</Text>
                    <Text style={{ color: '#00ABF4', fontSize: '18px' }}>{totalGenres || 0}</Text>
                </div>

            </div>
        </Container>
    )
}

export default Statistics