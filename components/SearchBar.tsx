import { icons } from "@/constants/icons";
import { View, Image, TextInput} from "react-native";

interface Props{
    value?: string,
    placeholder: string,
    onPress?: () => void,
    onChangeText?: (text: string) => void,
}

export default function SearchBar({placeholder, onPress, value, onChangeText} : Props) {
    return (
        <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
            <Image source={icons.search} className="size-5 mr-2" tintColor="#ab8bff" resizeMode="contain"/>
            <TextInput
                onPress = {onPress}
                value= {value ? value : ""}
                placeholder={placeholder}
                onChangeText={onChangeText}
                placeholderTextColor="#a8b5db"
                className="flex-1 ml-2 text-white"
            />
        </View>
    );
}