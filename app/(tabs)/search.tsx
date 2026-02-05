import {View, Text, Image, ActivityIndicator, FlatList} from 'react-native';
import React, { useEffect, useState } from 'react';
import { images } from '@/constants/images';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import useFetch from '@/services/useFetch';
import { fetchMovies } from '@/services/api';
import MovieCard from '@/components/MoiveCard';
import { updateSearchCount } from '@/services/appwrite';

export default function Search(){
    const [searchQuery, setSearchQuery] = useState('');
    const { data: movies, loading: moviesLoading, error: moviesError, refetch: loadMovies, reset } = useFetch(() => fetchMovies({ query: searchQuery }), false);
    useEffect(()=>{
        const timeout = setTimeout(async() => {
            if(searchQuery.trim()){
                await loadMovies();
            }
            else{
                reset();
            }
        }, 1000);
        return () => clearTimeout(timeout)
    },[searchQuery]);
    useEffect(()=>{
      if(movies && movies.length>0 && searchQuery.trim()){
        const recordSearch = async() => {
          await updateSearchCount(searchQuery, movies[0]);
        }
        recordSearch();
      }
    },[movies]);
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
              ListHeaderComponent={
                <View className="px-5">
                    <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
                    <SearchBar 
                        value = {searchQuery}
                        placeholder="Search through 300+ movies online" 
                        onChangeText={(text) => setSearchQuery(text)}
                    />
                    {searchQuery.trim().length>0? <Text className="text-xl text-white font-bold mt-5 mb-3">Search results for <Text className='text-2xl text-accent'>{searchQuery}</Text></Text> : <Text className="text-xl text-white font-bold mt-5 mb-3">What's on your mind</Text>}
                </View>} 
              contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }} 
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      );
}

