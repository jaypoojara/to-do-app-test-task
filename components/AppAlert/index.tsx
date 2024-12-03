import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { FC, memo } from "react";
import { AppAlertProps } from "@/types/component.types";
import AppButton from "../AppButton";
import { styles } from "./styles";

const AppAlert: FC<AppAlertProps> = ({
  title,
  message,
  visible,
  onClose,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal transparent visible={visible} onRequestClose={onClose}>
      <TouchableOpacity
        onPress={onClose}
        activeOpacity={1}
        style={styles.container}
      >
        <TouchableWithoutFeedback>
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            {message && <Text>{message}</Text>}
            <View style={styles.buttonContainer}>
              <AppButton
                title="Cancel"
                onPress={onCancel}
                style={styles.cancelButton}
              />
              <AppButton
                title="Confirm"
                onPress={onConfirm}
                style={styles.confirmButton}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default memo(AppAlert);
