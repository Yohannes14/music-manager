import styled from '@emotion/styled';
import React, { useEffect } from 'react'
import { useAppSelector } from '../store/configureStore';
import { useDispatch } from 'react-redux';
import { getStatisticsStart } from '../redux/statistics';

const TableContainer = styled.div`
  font-family: Arial, Helvetica, sans-serif;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const TableHeader = styled.th`
      font-size: 16px;
      font-weight: 300;
      line-height: 21px;
      letter-spacing: 0em;
      text-align: left;
      background-color: #FFFFFF54;
      color: #FFFFFF;
      padding: 10px 20px 5px 20px;
`;

const TableRow = styled.tr`
 
`;

const TableCell = styled.td`
  padding: 10px 20px 5px 20px;
  font-family: Gothic A1;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0em;
  text-align: left;
  color:#B3B3B3;

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
const Loading = styled.h1`
text-align: center;
font-size: 18px;
color: #999;
margin-top: 20px;
`;



const Artist = () => {
    const dispatch = useDispatch();
    const { artistsStatistics, loading } = useAppSelector((state) => state.stat);
    useEffect(() => {
        dispatch(getStatisticsStart());

    }, [dispatch]);
   
    if (loading) {
        return <Loading>Loading ...</Loading>
    }

    return (
        <TableContainer>
            <>
                <Text>Number of songs & albums each artist has:</Text>
            </>
            <Table>
                <thead>
                    <TableRow>

                        <TableHeader>
                            #
                        </TableHeader>
                        <TableHeader>Name of Artists</TableHeader>
                        <TableHeader>Number of Songs</TableHeader>
                        <TableHeader>Number of Albums</TableHeader>
                    </TableRow>
                </thead>
                <tbody>

                    {artistsStatistics?.map((artist, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{artist._id}</TableCell>
                            <TableCell>{artist.songsCount}</TableCell>
                            <TableCell>{artist.albumsCount}</TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        </TableContainer>
    )
}

export default Artist