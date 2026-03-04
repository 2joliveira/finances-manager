import { Suspense } from "react";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { migrate } from "@/database/migrate";
import { colors } from "@/theme";
import { Loading } from "../components/Loading";
import { FinancesManagerProvider } from "@/context/context";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <SQLiteProvider
        databaseName="financesmanager.db"
        onInit={migrate}
        useSuspense
      >
        <FinancesManagerProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: colors.gray[100] },
            }}
          />
        </FinancesManagerProvider>
      </SQLiteProvider>
    </Suspense>
  );
}
