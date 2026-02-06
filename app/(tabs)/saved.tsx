import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {MotiView} from 'moti';

// Mock Data - Replace this with your Appwrite/State data later
const SAVED_MOVIES = [
  { id: '1168190', title: 'Wrecking Crew ', rating: 7.0, image: 'https://image.tmdb.org/t/p/w500/gbVwHl4YPSq6BcC92TQpe7qUTh6.jpg' },
  { id: '840464', title: 'Greenland 2', rating: 7.0, image: 'https://image.tmdb.org/t/p/w500//z2tqCJLsw6uEJ8nJV8BsQXGa3dr.jpg' },
];

const SavedMovieCard = ({ item }: { item: any }) => {
  const router = useRouter();

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 500 }}
    >
      <TouchableOpacity
        className="flex-row items-center mb-6 bg-secondary/10 p-3 rounded-2xl border border-white/10"
        onPress={() => router.push(`/movies/${item.id}`)}
      >
        <Image
          source={{ uri: item.image }}
          className="w-20 h-28 rounded-xl"
          resizeMode="cover"
        />

        <View className="flex-1 ml-4 justify-cenrter">
          <Text className="text-white text-lg font-bold" numberOfLines={1}>
            {item.title}
          </Text>
          <View className="flex-row items-center mt-1">
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text className="text-gray-400 text-sm ml-1">
              {item.rating} / 10
            </Text>
          </View>
        </View>

        <TouchableOpacity className="p-2">
          <Ionicons name="bookmark" size={24} color="#AB8BFF" />
        </TouchableOpacity>
      </TouchableOpacity>
    </MotiView>
  );
};

export default function SavedMovies() {
  return (
    <View className="flex-1 bg-primary px-5 py-10">
      <FlatList
        data={SAVED_MOVIES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SavedMovieCard item={item} />}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center mt-20">
            <Ionicons name="film-outline" size={80} color="#1f2937" />
            <Text className="text-gray-500 text-lg mt-4 text-center">
              Your watchlist is empty.{"\n"}Start adding some movies!
            </Text>
          </View>
        }
      />
    </View>
  );
}