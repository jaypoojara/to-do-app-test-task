import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { FC } from "react";
import colors from "@/theme/colors";
import { styles } from "./styles";
import { AppButtonProps } from "@/types/component.types";

const AppButton: FC<AppButtonProps> = ({
  title,
  textStyle,
  style,
  isLoading,
  disabled,
  ...props
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      {...props}
      disabled={disabled || isLoading}
      style={[
        styles.container,
        style,
        disabled && { backgroundColor: colors.gray1_40 },
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;
