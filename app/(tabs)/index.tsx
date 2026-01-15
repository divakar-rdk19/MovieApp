import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { View, Image, Text, ScrollView, ActivityIndicator, FlatList} from "react-native";
import { useRouter } from "expo-router";
import SearchBar from "@/components/SearchBar";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MoiveCard";

export default function Index() {
  const router = useRouter();
  const { data: movies, loading: moviesLoading, error: moviesError } = useFetch(() => fetchMovies({ query: '' }));

  const renderHeader = () => (
    <View className="px-5">
      <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
      <SearchBar 
        placeholder="Search a movie" 
        onPress={() => router.push("/search")} 
      />
      <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      
      {moviesLoading ? (
        <ActivityIndicator size="large" color="#AB8BFF" className="flex-1 self-center" />
      ) : moviesError ? (
        <View className="flex-1 justify-center items-center">
            <Text className="text-white">Error: {moviesError.message}</Text>
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
          ListHeaderComponent={renderHeader} 
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }} 
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}