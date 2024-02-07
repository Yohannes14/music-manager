import styled from '@emotion/styled';
import React, { useEffect } from 'react'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin5Line } from 'react-icons/ri'
import image from "../assets/image.png"
import { getSongsStart } from '../redux/songsSlice';
import { useAppSelector } from '../store/configureStore';
import { useDispatch } from 'react-redux';

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
const Loading = styled.h1`
text-align: center;
font-size: 18px;
color: #999;
margin-top: 20px;
`;
const TableHeaderContainer = styled.div`
   display: flex;
   justify-content: start;
   alignItems: center;
   gap: 6px ;
`;

const TableCellContainer = styled.div`
    display: flex; 
    justify-content: start;
    align-items: center;
    gap: 6px;
    place-items: initial 
`;

const TableAction = styled.div`
   display: flex;
   justify-content: start;
   align-items: center;
   gap: 4px;
`;

const Button = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
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


interface SongListProps {
  onEdit: (_id: string) => void;
  onDelete: (_id: string) => void;
}

const SongList: React.FC<SongListProps> = ({ onEdit, onDelete }) => {
  const dispatch = useDispatch();
  const { songs, loading: loadingSongList } = useAppSelector((state) => state.songs);

  useEffect(() => {
    dispatch(getSongsStart());
  }, [dispatch]);
  if (loadingSongList) {
    return <Loading>Loading ...</Loading>
  }

  return (
    <TableContainer>
      <Text>Music List:</Text>
      <Table>
        <thead>
          <TableRow>

            <TableHeader>
              <TableHeaderContainer>

                <span>#</span>
                <span>Title</span>
              </TableHeaderContainer>

            </TableHeader>
            <TableHeader>Albums</TableHeader>
            <TableHeader>Artist</TableHeader>
            <TableHeader>Genres</TableHeader>
            <TableHeader>Action</TableHeader>
          </TableRow>
        </thead>
        <tbody>

          {songs?.map((song, index) => (
            <TableRow key={song._id}>
              <TableCell>
                <TableCellContainer>
                  <span>{index + 1}</span>
                  <img src={image} />
                  <span>{song.title}</span>

                </TableCellContainer>
              </TableCell>
              <TableCell>{song.album}</TableCell>
              <TableCell>{song.artist}</TableCell>
              <TableCell>{song.genre}</TableCell>
              <TableCell>
                <TableAction>
                  <Button onClick={() => onEdit(song._id)}><FiEdit size={24} color='#B3B3B3' /></Button>
                  <Button onClick={() => onDelete(song._id)}><RiDeleteBin5Line size={24} color='#B3B3B3' /></Button>
                </TableAction>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  )
}

export default SongList