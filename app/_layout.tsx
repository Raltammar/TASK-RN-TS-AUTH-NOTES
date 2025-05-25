import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import colors from "../data/styling/colors";
import { StatusBar } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContext from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { getToken } from "@/api/storage";

export default function RootLayout() {
  const queryClient = new QueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // console.log(" isAuthenticated:", isAuthenticated);

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      if (token) setIsAuthenticated(true);
    };
    checkToken();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
          <QueryClientProvider client={queryClient}>
            <Stack screenOptions={{ headerShown: false }}>
              {isAuthenticated ? (
                <Stack.Screen name="(tabs)" />
              ) : (
                <Stack.Screen name="(auth)" />
              )}
            </Stack>
          </QueryClientProvider>
        </AuthContext.Provider>
        <StatusBar barStyle={"light-content"} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
