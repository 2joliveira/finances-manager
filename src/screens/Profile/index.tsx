import { View } from "react-native";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAccount, useCategories } from "@/hooks";
import { TagOption, TagOptionProps } from "./components/TagOption";
import { OptionsList } from "./components/OptionsList";
import { FixedExpensesList } from "./components/FixedExpensesList";
import { ProfileHeader } from "./components/ProfileHeader";
import { styles } from "./styles";

interface TagsOptionsProps extends TagOptionProps {
  option: "accounts" | "categories" | "transactions";
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
  const { categories, deleteCategory } = useCategories();
  const { accounts, deleteAccount } = useAccount();
  const [selectedTag, setSelectedTag] =
    useState<TagsOptionsProps["option"]>("categories");
  const insets = useSafeAreaInsets();

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

        {selectedTag === "accounts" && (
          <OptionsList
            options={accounts}
            typeList="accountForm"
            removeOption={deleteAccount}
          />
        )}

        {selectedTag === "categories" && (
          <OptionsList
            options={categories}
            typeList="categoryForm"
            removeOption={deleteCategory}
          />
        )}

        {selectedTag === "transactions" && <FixedExpensesList />}
      </View>
    </View>
  );
}
