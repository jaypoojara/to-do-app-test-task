import { View, Text, TextInput, Image } from "react-native";
import { FC, memo } from "react";
import { styles } from "./styles";
import colors from "@/theme/colors";
import { InputProps } from "@/types/component.types";

const Input: FC<InputProps> = ({
  label,
  containerStyle,
  wrapperStyle,
  style,
  error,
  leftIcon,
  leftStyle,
  placeholderTextColor = colors.white6,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.wrapperStyle, wrapperStyle]}>
        {leftIcon && (
          <Image source={leftIcon} style={[styles.leftIcon, leftStyle]} />
        )}
        <TextInput
          {...props}
          placeholderTextColor={placeholderTextColor}
          style={[styles.input, style]}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default memo(Input);
