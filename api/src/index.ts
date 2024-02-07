import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './routes/routes';
import { config } from './config/config';
import { SongModal } from './models/song';

const app = express();
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

app.use('/api', router);

const server = http.createServer(app);


async function connectToDatabase() {
    try {
        await mongoose.connect(config.dbURL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
// Call the connectToDatabase function
connectToDatabase();


const ethiopianMusicList = [
    {
        title: 'Ene Negn Yeshi',
        artist: 'Gossaye Tesfaye',
        album: 'Ene Negn Yeshi',
        genre: 'Ethiopian',
    },
    {
        title: 'Tew Man Necheh',
        artist: 'Mahmoud Ahmed',
        album: 'Tew Man Necheh',
        genre: 'Ethio-Jazz',
    },
    {
        title: 'Belomi Benna',
        artist: 'Tilahun Gessesse',
        album: 'Belomi Benna',
        genre: 'Traditional',
    },
    {
        title: 'Yene Felagote',
        artist: 'Aster Aweke',
        album: 'Kabu',
        genre: 'Pop',
    },
    {
        title: 'Yeberhaw Guzo',
        artist: 'Mulatu Astatke',
        album: 'Yekatit Ethio Jazz',
        genre: 'Ethio-Jazz',
    },
    {
        title: 'Sost Tsion',
        artist: 'Gigi Shibabaw',
        album: 'Gigi',
        genre: 'World',
    },
    {
        title: 'Yene Mar',
        artist: 'Teddy Afro',
        album: 'Yasteseryal',
        genre: 'Reggae',
    },
    {
        title: 'Yi Godellel',
        artist: 'Mohammed Ahmed',
        album: 'Ere Mela Mela',
        genre: 'Ethio-Jazz',
    },
    {
        title: 'Hode Baba',
        artist: 'Ezra Kibret',
        album: 'Ezra Kibret',
        genre: 'Folk',
    },
    {
        title: 'Hageren',
        artist: 'Girma Beyene',
        album: 'Ethiopian Urban Modern Music Vol. 5',
        genre: 'Ethio-Jazz',
    },
];
const insertEthiopianMusicData = async () => {
    try {
        // Insert the Ethiopian music list data to MongoDB
        const result = await SongModal.insertMany(ethiopianMusicList);
        console.log(`${result.length} documents inserted successfully into MongoDB.`);
    } catch (error) {
        console.error('Error inserting Ethiopian music data to MongoDB:', error);
    }
};

// Call the function to insert data
insertEthiopianMusicData();

// Define the port from the configuration
const port: number = config.port;

// Start the Express server
server.listen(port, () => {
    console.log(`Server ready on port ${port}`);
});
