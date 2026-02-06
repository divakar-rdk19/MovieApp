import { Stack } from 'expo-router';

export default function MovieLayout() {
  return (
    // Set screenOptions here to apply to ALL screens in this folder
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="[id]" 
        options={{ // This is now redundant since header is hidden
          headerShown: false 
        }} 
      />
    </Stack>
  );
}