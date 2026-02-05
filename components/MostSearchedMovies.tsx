import { View, Text, Touchable, TouchableOpacity, Image } from "react-native";
import React from 'react';
import { Link } from "expo-router";
import MaskedView from '@react-native-masked-view/masked-view';
import { images } from "@/constants/images";

interface Props{
    movie: TrendingMovie,
    index: number
}

export default function MostSearchedMovieCard({ movie, index}: Props){
    return(
        <Link href={`/movies/${movie.movie_id}`} asChild>
                <TouchableOpacity className="flex-1 w-32">
                    <Image source={{uri: movie.poster_url ? `${movie.poster_url}` : `https://placehold.c0/600x400/1a1a1a/ffffff.png`}} className="w-full h-48 rounded-lg" resizeMode="cover"/>
                    <View className="absolute bottom-9 -left-3.5 px-2 py-1 rounded-full">
                        <MaskedView maskElement={
                            <Text className="font-bold text-white text-6xl">{index+1}</Text>
                        }>
                        <Image source={images.rankingGradient} className="size-14" resizeMode="cover"/>
                        </MaskedView>
                    </View>
                    <Text className="text-sm font-bold text-light-200 mt-2" numberOfLines={2}>{movie.title}</Text>
                </TouchableOpacity>
        </Link>
    );
}