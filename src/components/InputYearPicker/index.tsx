import { useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { colors, fontFamily } from "@/theme";
import { useTransactions } from "@/hooks/useTransaction";

export default function InputYearPicker() {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [isOpen, setIsOpen] = useState(false);

  const scrollRef = useRef<ScrollView>(null);

  const { loadMonths } = useTransactions();

  const years = Array.from({ length: 20 }, (_, i) => 2020 + i);

  function handleSelectYear(year: number) {
    setIsOpen(false);
    loadMonths(year);
    setSelectedYear(year);
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setIsOpen(true)}>
          <Text style={styles.text}>{selectedYear}</Text>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={isOpen}
        style={styles.listContainer}
        onBackdropPress={() => setIsOpen(false)}
        animationIn="fadeInRight"
        animationOut="fadeOutRight"
        onModalShow={() => {
          const index = years.indexOf(selectedYear);

          scrollRef.current?.scrollTo({
            y: index * 35,
            animated: false,
          });
        }}
      >
        <ScrollView ref={scrollRef}>
          {years.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => handleSelectYear(item)}
              style={{
                ...styles.listItem,
                backgroundColor: item === selectedYear && colors.gray[400],
              }}
            >
              <Text
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontFamily: item === selectedYear && fontFamily.bold,
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    padding: 8,
    backgroundColor: colors.blue[500],
    borderRadius: 10,
  },
  text: {
    fontFamily: fontFamily.regular,
    fontSize: 15,
    color: colors.gray[100],
  },
  listContainer: {
    position: "absolute",
    width: "20%",
    height: 200,
    top: 70,
    right: 70,
    borderRadius: 8,
    backgroundColor: colors.gray[100],
    gap: 25,
    overflow: "scroll",
  },
  listItem: {
    flex: 1,
    padding: 10,
  },
});
