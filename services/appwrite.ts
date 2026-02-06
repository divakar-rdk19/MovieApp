import {Client, ID, Query, TablesDB} from 'react-native-appwrite';
import { executeNativeBackPress } from 'react-native-screens';

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const TABLE_ID= process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!;

const client = new Client().setEndpoint('https://sgp.cloud.appwrite.io/v1').setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);
const database = new TablesDB(client);

export const updateSearchCount = async(query: string, movie: Movie) => {
    try {
        const result = await database.listRows({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        queries:[
            Query.equal('search_term', query)
        ]
    });
    if(result.total>0){
        const existingMovie = result.rows[0];
        await database.updateRow({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            rowId: existingMovie.$id,
            data: {
                count: existingMovie.count + 1 
            }
        });
    }
    else{
        await database.createRow({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            rowId: ID.unique(),
            data:{
                search_term: query,
                count: 1,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                movie_id: movie.id,
                title: movie.title
            }
        });
    }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getMostSerachedMovies = async() : Promise<TrendingMovie[] | null> =>{
    try {
        const result = await database.listRows({
            tableId: TABLE_ID,
            databaseId: DATABASE_ID,
            queries: [
                Query.orderDesc('count'),
                Query.limit(20)
            ]
        });
        const uniqueMostSearchedMovies = Array.from(new Map(result.rows.map(item => [item.title, item])).values()).slice(0,5);
        return  uniqueMostSearchedMovies as unknown as TrendingMovie[];
    } catch (error) {
        console.log(error);
        return null;
    }
}