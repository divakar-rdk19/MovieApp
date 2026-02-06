import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from 'react';
import {Ionicons} from '@expo/vector-icons';

const StatItem = ({ label, count }: { label: string; count: string }) => (
  <View className="items-center">
    <Text className="text-white text-xl font-bold">{count}</Text>
    <Text className="text-gray-400 text-xs mt-1 uppercase tracking-widest">
      {label}
    </Text>
  </View>
);

const MenuItem =({title, icon, color = "#AB8BFF"} : {title: string; icon: any; color?: string }) =>(
    <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-white/5 activeOpacity={0.7}">
        <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-full items-center justify-center mr-4" style={{backgroundColor: `${color}20`}}>
                <Ionicons name={icon} size={20} color={color}/>
            </View>
            <Text className="text-white text-base font-medium">{title}</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#4B5563"/>
    </TouchableOpacity>
);

export default function Profile(){
    return (
      <View className=" flex-1 w-full bg-primary">
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <View className="h-80 items-center justify-center relative">
            <View className="w-28 h-28 rounded-full border-4 border-accent overflow-hidden shadow-2xl shadow-black">
              <Image
                source={{
                  uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
                }}
                className="w-full h-full bg-secondary"
              />
            </View>
            <Text className="text-white text-3xl font-bold mt-5">Divakar</Text>
            <Text className="text-accent font-medium tracking-widest uppercase text-xs mt-1">
              Premium Member
            </Text>
          </View>
          <View className="flex-row justify-between px-8 py-6 bg-white/5 mx-5 rounded-3xl border border-white/10" style={{marginTop: -40}}>
                <StatItem label="Watched" count="154"/>
                <View className="w-[1px] bg-white/10"/>
                <StatItem label="Watchlist" count="12"/>
                <View className="w-[1px] bg-white/10"/>
                <StatItem label="Reviews" count="98"/>
          </View>
          <View className="px-6 mt-10 mb-20">
            <Text className="text-gray-500 font-bold mb-4 uppercase tracking-widest text-xs">Account Settings</Text>
            <MenuItem title="Edit Profile" icon="person-outline"/>
            <MenuItem title="My Subscription" icon="card-outline"/>
            <MenuItem title="Downloads" icon="download-outline"/>
            <MenuItem title="Privacy and Security" icon="lock-closed-outline"/>
            <TouchableOpacity className="mt-12 py-4 bg-red-500/10 border border-red-500/20 rounded-2xl items-center">
                <Text className="text-red-500 font-bold text-base">Logout</Text>
            </TouchableOpacity>
            <Text className="text-center text-gray-600 mt-8 text-xs">Version 1.0.2 (Dev Build)</Text>
          </View>
        </ScrollView>
      </View>
    );
}