import { View } from "react-native";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAccount, useCategories } from "@/hooks";
import { TagOption, TagOptionProps } from "./components/TagOption";
import { OptionsList } from "./components/OptionsList";
import { FixedExpensesList } from "./components/FixedExpensesList";
import { styles } from "./styles";
import { ProfileHeader } from "./components/ProfileHeader";

interface TagsOptionsProps extends TagOptionProps {
  option: string;
}

const TAGS_OPTIONS: TagsOptionsProps[] = [
  {
    option: "accounts",
    icon: "account-balance",
    title: "Contas",
  },
  {
    option: "categories",
    icon: "sell",
    title: "Categorias",
  },
  {
    option: "transactions",
    icon: "event-repeat",
    title: "Fixos",
  },
];

export function Profile() {
  const { categories } = useCategories();
  const { accounts, deleteAccount, isDeletingAccount } = useAccount();
  const [selectedTag, setSelectedTag] = useState("categories");
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <ProfileHeader />

      <View style={styles.content}>
        <View style={styles.tags_options}>
          {TAGS_OPTIONS.map(({ option, icon, title }) => (
            <TagOption
              key={option}
              icon={icon}
              title={title}
              selected={selectedTag === option}
              onPress={() => setSelectedTag(option)}
            />
          ))}
        </View>

        {selectedTag != "transactions" && (
          <OptionsList
            options={selectedTag === "categories" ? categories : accounts}
            typeList={
              selectedTag === "categories" ? "categoryForm" : "accountForm"
            }
            removeOption={deleteAccount}
            isLoading={isDeletingAccount}
          />
        )}

        {selectedTag === "transactions" && <FixedExpensesList />}
      </View>
    </View>
  );
}
