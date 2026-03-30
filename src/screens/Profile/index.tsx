import { Text, View } from "react-native";
import { ProfileHeader } from "./ProfileHeader";
import { styles } from "./styles";
import { TagCard, TagCardProps } from "./components/TagCard";
import { useState } from "react";

interface TagsOptionsProps extends TagCardProps {
  option: string;
}

const TAGS_OPTIONS: TagsOptionsProps[] = [
  {
    option: "accounts",
    icon: "account-balance",
    title: "Contas"
  },
  {
    option: "categories",
    icon: "sell",
    title: "Categorias"
  },
  {
    option: "transactions",
    icon: "event-repeat",
    title: "Fixos"
  }
]

export function Profile() {
  const [selectedTag, setSelectedTag] = useState("categories");

  return (
    <View style={styles.container}>
      <ProfileHeader />

      <View style={styles.content}>
        <View style={styles.tags_options}>
          {TAGS_OPTIONS.map(({ option, icon, title }) => (
            <TagCard
              key={option}
              icon={icon}
              title={title}
              selected={selectedTag === option}
              onPress={() => setSelectedTag(option)}
            />
          ))}
        </View>
      </View>
    </View>
  )
}