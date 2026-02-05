import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { View, Image, Text, ActivityIndicator, FlatList} from "react-native";
import { useRouter } from "expo-router";
import SearchBar from "@/components/SearchBar";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MoiveCard";
import { getMostSerachedMovies } from "@/services/appwrite";
import MostSearchedMovieCard from "@/components/MostSearchedMovies";

export default function Index() {
  const router = useRouter();
  const {data: mostSearchedMovies, loading: mostSearchLoading, error: mostSearchError} = useFetch(() => getMostSerachedMovies());
  const { data: movies, loading: moviesLoading, error: moviesError } = useFetch(() => fetchMovies({ query: '' }));

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      
      {moviesLoading || mostSearchLoading ? (
        <ActivityIndicator size="large" color="#AB8BFF" className="flex-1 self-center" />
      ) : moviesError || mostSearchError  ? (
        <View className="flex-1 justify-center items-center">
            <Text className="text-white">Error: {moviesError? moviesError.message : mostSearchError?.message}</Text>
        </View>
      ) : (
        <FlatList
          data={movies}
          renderItem={({ item }) => (
            <View className="flex-1 p-1">
               <MovieCard {...item} />
            </View>
          )}
          numColumns={3}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <View className="px-5">
            <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
            <SearchBar 
              placeholder="Search a movie" 
              onPress={() => router.push("/search")} 
            />
            {mostSearchedMovies && (
              <View>
                <View className="mt-10">
                <Text className="text-lg text-white font-bold mt-5 mb-3">Most Searched Movies</Text>
              </View>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() =>
                  <View className="w-4"/>
                }
                data={mostSearchedMovies}
                renderItem={({item, index}) =>(
                  <MostSearchedMovieCard movie={item} index={index}/>
                )}
                keyExtractor={(item) => item.movie_id.toString()}
              />
              </View>
            )}
            <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
            </View>
          } 
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }} 
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}