import { ReactNode } from "react";
import {
  ImageSourcePropType,
  ImageStyle,
  StatusBarStyle,
  StyleProp,
  TextInputProps,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { Edges } from "react-native-safe-area-context";

export type AppButtonProps = TouchableOpacityProps & {
  title: string;
  textStyle?: StyleProp<TextStyle>;
  isLoading?: boolean;
};

export type AppHeaderProps = {
  title: string;
  onRightPress?: () => void;
  rightIcon?: ImageSourcePropType;
  rightImageStyle?: StyleProp<ImageStyle>;
};

export type FullScreenContainerProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  edges?: Edges;
  barStyle?: StatusBarStyle;
};

export type InputProps = TextInputProps & {
  containerStyle?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
  label?: string;
  error?: string;
  leftIcon?: ImageSourcePropType;
  leftStyle?: StyleProp<ImageStyle>;
};

export type AppAlertProps = {
  title: string;
  message?: string;
  visible?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
};
