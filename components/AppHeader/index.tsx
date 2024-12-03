import { View, Text, TouchableOpacity, Image } from "react-native";
import { FC, memo } from "react";
import { goBack } from "@/utils/NavigationUtils";
import { Images } from "@/constants/images";
import { styles } from "./styles";
import { AppHeaderProps } from "@/types/component.types";

const AppHeader: FC<AppHeaderProps> = ({
  title,
  rightIcon,
  onRightPress,
  rightImageStyle,
}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity hitSlop={12} onPress={goBack} activeOpacity={0.8}>
        <Image source={Images.next} style={styles.backButtonImage} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity onPress={onRightPress} hitSlop={12} activeOpacity={0.8}>
        <Image
          source={rightIcon}
          style={[styles.rightButtonImage, rightImageStyle]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default memo(AppHeader);
