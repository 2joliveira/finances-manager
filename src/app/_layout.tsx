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
import { FinancesManagerProvider } from "@/context/context";
import { ReactQueryProvider } from "@/services/react-query-provider";
import { colors } from "@/theme";
import { Loading } from "../components/Loading";

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
        <ReactQueryProvider>
          <FinancesManagerProvider>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: colors.gray[100] },
              }}
            />
          </FinancesManagerProvider>
        </ReactQueryProvider>
      </SQLiteProvider>
    </Suspense>
  );
}
