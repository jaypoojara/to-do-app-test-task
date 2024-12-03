import { View, Text, TouchableOpacity, Image } from "react-native";
import { FC, memo } from "react";
import colors from "@/theme/colors";
import { Images } from "@/constants/images";
import { styles } from "./styles";
import { navigate } from "@/utils/NavigationUtils";
import Routes from "@/constants/routes";
import { Task } from "@/types/service.types";
import moment from "moment";

const ToDoItem: FC<Task> = (props) => {
  const { isCompleted, title, description, due_date } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigate(Routes.ToDoDetailsScreen, props)}
      style={styles.taskContainer}
    >
      <View
        style={[
          styles.taskIndicator,
          { backgroundColor: isCompleted ? colors.success : colors.warning },
        ]}
      />
      <View style={styles.taskContent}>
        <View style={styles.taskTitleContainer}>
          <Text numberOfLines={1} style={styles.taskTitle}>
            {title}
          </Text>
          {isCompleted && (
            <View style={styles.taskCompleteContainer}>
              <Text style={styles.taskComplete}>COMPLETE</Text>
            </View>
          )}
        </View>
        <Text numberOfLines={2} style={styles.taskText}>
          {description}
        </Text>
        <View style={styles.dateContainer}>
          <Image source={Images.calendar} style={styles.taskDateImage} />
          <Text numberOfLines={2} style={styles.dateText}>
            {moment(due_date).format("DD-MM-YYYY")}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(ToDoItem);
