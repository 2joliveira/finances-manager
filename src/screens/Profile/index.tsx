import { Text, View } from "react-native";
import { ProfileHeader } from "./ProfileHeader";
import { styles } from "./styles";
import { useState } from "react";
import { TagOption, TagOptionProps } from "./components/TagOption";
import { OptionsList } from "./components/OptionsList";
import { useAccount, useCategories } from "@/hooks";

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
  const { accounts } = useAccount();
  const [selectedTag, setSelectedTag] = useState("categories");

  return (
    <View style={styles.container}>
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
          />
        )}
      </View>
    </View>
  );
}
