import { View, Text, Image, ScrollView } from "react-native";
import { FC, useState } from "react";
import FullScreenContainer from "@/components/FullScreenContainer";
import { navigate } from "@/utils/NavigationUtils";
import { Images } from "@/constants/images";
import moment from "moment";
import AppButton from "@/components/AppButton";
import { styles } from "./styles";
import { NavigationProps } from "@/types/navigation.types";
import Routes from "@/constants/routes";
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "@/services/task/task.query";
import AppHeader from "@/components/AppHeader";
import AppAlert from "@/components/AppAlert";
import CONSTANTS from "@/constants";

const ToDoDetailsScreen: FC<NavigationProps<"ToDoDetailsScreen">> = ({
  route,
}) => {
  const task = route.params;
  const { mutate: updateTaskMutation, isLoading: isUpdateTaskLoading } =
    useUpdateTaskMutation();

  const { mutate: deleteTaskMutation, isLoading: isDeleteTaskLoading } =
    useDeleteTaskMutation(task.id);

  const [alertVisible, setAlertVisible] = useState(false);

  const handleDeleteTask = () => {
    setAlertVisible(false);
    deleteTaskMutation();
  };

  const disabledBtn = isUpdateTaskLoading || isDeleteTaskLoading;
  return (
    <FullScreenContainer>
      <AppHeader
        title="To-Do Details"
        rightIcon={Images.editing}
        onRightPress={() => navigate(Routes.CreateNewToDoScreen, task)}
      />
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollViewContent}
        style={styles.scrollView}
      >
        <View style={styles.itemContainer}>
          <Text style={styles.taskTitle}>{task.title}</Text>
          <Text
            style={[
              styles.taskStatusText,
              task.isCompleted
                ? styles.completedTaskText
                : styles.incompleteTaskText,
            ]}
          >
            {task.isCompleted ? "Completed" : "Incomplete"}
          </Text>
          <Text style={styles.taskDescription}>{task.description}</Text>
          <View style={styles.infoRow}>
            <Image source={Images.calendar} style={styles.icon} />
            <Text style={styles.infoText}>
              {moment.utc(task.due_date).format(CONSTANTS.dateFormat)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Image source={Images.clock} style={styles.icon} />
            <Text style={styles.infoText}>
              {moment.utc(task.due_date).format(CONSTANTS.timeFormat)}
            </Text>
          </View>
        </View>
        {!task.isCompleted && (
          <AppButton
            isLoading={isUpdateTaskLoading}
            disabled={disabledBtn}
            title="Make as completed"
            onPress={() => updateTaskMutation({ ...task, isCompleted: "1" })}
          />
        )}
        <AppButton
          isLoading={isDeleteTaskLoading}
          onPress={() => setAlertVisible(true)}
          disabled={disabledBtn}
          title="Delete"
          style={styles.deleteButton}
          textStyle={styles.deleteButtonText}
        />
      </ScrollView>
      <AppAlert
        visible={alertVisible}
        title="Delete To-Do"
        message="Are you sure you want to delete this to-do?"
        onConfirm={handleDeleteTask}
        onCancel={() => setAlertVisible(false)}
        onClose={() => setAlertVisible(false)}
      />
    </FullScreenContainer>
  );
};

export default ToDoDetailsScreen;
