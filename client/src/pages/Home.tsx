import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { deleteSongStart } from '../redux/songsSlice';
import Statistics from '../components/Statistics';
import SongList from '../components/SongList';
import Modal from '../components/Modal';
import SongForm from '../components/SongForm';
import { FaRegSquarePlus } from 'react-icons/fa6';
import Album from '../components/Album';
import Artist from '../components/Artist';
import Genre from '../components/Genre';


const Container = styled.div`
    margin: 60px 20vh;
    
`;
const HorizontalLine = styled.div`
    border: 1px solid #767676;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom:25px;
`;


const AddButton = styled.div`
  cursor: pointer;
  font-family: Gothic A1;
  font-size: 18px;
  font-weight: 700;
  color: #FFFFFF99;
  display: flex;
  justify-content: center;
  gap: 18px፤
  padding: 8px 12px 8px 12px;
`;
const TabButton = styled.button < { active: boolean }>`
    font-family: Gothic A1;
    font-size: 18px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    gap: 15px;
    padding: 8px 12px 8px 12px;
    background-color: ${(props) => (props.active ? 'transparent' : 'black')};
    color: ${(props) => (props.active ? '#00ABF4' : '#FFFFFF99')};
    text-decoration: ${(props) => (props.active ? 'underline' : '#FFFFFF99')};
    border: none;
    cursor: pointer;

`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items:center;
  margin-bottom: 40px;
  
`;

const TabContainer = styled.div`
   display: flex;
   justify-content: flex-start;
    gap: 20px

`



const Home = () => {
    const [showForm, setShowForm] = useState(false);
    const [editSongId, setEditSongId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState("All");
    const dispatch = useDispatch();

    const handleDelete = (_id: string) => {
        dispatch(deleteSongStart(_id))
    };
    const handleUpdate = async (_id: string) => {
        setEditSongId(_id);
        editSongId && setShowForm(true);
    };


    const handleFormClose = () => {
        setShowForm(false);
    };


    return (
        <Container>
            <div>
                <h1>Music Manager</h1>
            </div>
            {/*  */}
            <Statistics />
            <HorizontalLine />

            <ControlsContainer>
                <TabContainer>
                    <TabButton onClick={() => setActiveTab('All')} active={activeTab === 'All'}>
                        All
                    </TabButton>
                    <TabButton onClick={() => setActiveTab('Artist')} active={activeTab === 'Artist'}>
                        Artist
                    </TabButton>
                    <TabButton onClick={() => setActiveTab('Album')} active={activeTab === 'Album'}>
                        Album
                    </TabButton>
                    <TabButton onClick={() => setActiveTab('Genre')} active={activeTab === 'Genre'}>
                        Genre
                    </TabButton>
                </TabContainer>

                {/* <div style={{ position: 'relative' }}>
                    <SearchIcon />
                    <FilterInput type="text" placeholder="Search" value={'pop'} onChange={() => { }} />

                </div> */}

                <AddButton onClick={() => setShowForm(true)}>
                    <FaRegSquarePlus size={22} color='#FFFFFF99' style={{ marginRight: '6px' }} /><span>Add New</span>
                </AddButton>
            </ControlsContainer>
            {activeTab === "All" && (
                <SongList onEdit={handleUpdate} onDelete={handleDelete} />
            )}
            {activeTab === "Album" && (
                <Album />
            )}
            {activeTab === "Artist" && (
                <Artist />
            )}
            {activeTab === "Genre" && (
                <Genre />
            )}

            <Modal isOpen={showForm} onClose={handleFormClose} initialSongId={editSongId}>
                <SongForm
                    onSubmit={() => {
                        setShowForm(false);
                        setEditSongId(null);
                    }}
                    initialSongId={editSongId}
                />
            </Modal>
        </Container>
    )
}

export default Home