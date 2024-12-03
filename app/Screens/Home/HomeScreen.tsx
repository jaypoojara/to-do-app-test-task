import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { FC, useEffect, useMemo } from "react";
import FullScreenContainer from "@/components/FullScreenContainer";
import { getGreeting, getTasksFlatData, logout } from "@/utils/HelperUtils";
import { Images } from "@/constants/images";
import ToDoItem from "@/components/ToDoItem";
import { navigate } from "@/utils/NavigationUtils";
import Routes from "@/constants/routes";
import { styles } from "./styles";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import useGetUser from "@/hooks/useGetUser";
import {
  useGetTaskCountsQuery,
  useGetTaskQuery,
} from "@/services/task/task.query";
import { TASK_STATUS } from "@/types/service.types";
import colors from "@/theme/colors";
import { useIsFocused } from "@react-navigation/native";

const HomeScreen: FC = () => {
  const { username } = useGetUser();

  const { data: tasksCounts, refetch: taskCountsRefetch } =
    useGetTaskCountsQuery();
  const {
    data: completedTasks,
    isLoading: completedTasksLoading,
    refetch: completedTasksRefetch,
  } = useGetTaskQuery({
    page: 1,
    pageSize: 5,
    isCompleted: TASK_STATUS.COMPLETED,
  });
  const {
    data: incompleteTasks,
    isLoading: incompleteTasksLoading,
    refetch: incompleteTasksRefetch,
  } = useGetTaskQuery({
    page: 1,
    pageSize: 5,
    isCompleted: TASK_STATUS.INCOMPLETE,
  });

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      taskCountsRefetch();
      completedTasksRefetch();
      incompleteTasksRefetch();
    }
  }, [isFocused]);

  const completedTasksFlat = useMemo(() => {
    return getTasksFlatData(completedTasks);
  }, [completedTasks]);

  const incompleteTasksFlat = useMemo(() => {
    return getTasksFlatData(incompleteTasks);
  }, [incompleteTasks]);

  const isLoading = completedTasksLoading || incompleteTasksLoading;
  const noTasks =
    completedTasksFlat.length <= 0 && incompleteTasksFlat.length <= 0;

  return (
    <FullScreenContainer style={styles.container}>
      <View style={styles.greetingContainer}>
        <View style={styles.greetingContent}>
          <Text style={styles.greetingTitle}>{getGreeting()},</Text>
          <Text style={styles.greetingUsername}>{username}</Text>
        </View>
        <Menu>
          <MenuTrigger>
            <View>
              <Image source={Images.user} style={styles.userImage} />
            </View>
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={styles.optionsContainerStyle}>
            <MenuOption style={styles.menuOptionStyle} onSelect={logout}>
              <View style={styles.menuItem}>
                <Image source={Images.logout} style={styles.logoutImage} />
                <Text style={styles.logoutText}>Logout</Text>
              </View>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>

      <TouchableOpacity
        onPress={() => navigate(Routes.ToDoListScreen)}
        activeOpacity={0.8}
        style={styles.searchBar}
      >
        <Image source={Images.search} style={styles.searchImage} />
        <Text style={styles.searchText}>Search here</Text>
      </TouchableOpacity>

      <View style={styles.tasksContainer}>
        <Image source={Images.writer} style={styles.writerImage} />
        <View style={styles.tasksContent}>
          <Text style={styles.tasksTitle}>Today's Tasks</Text>
          <Text style={styles.tasksText}>
            <Text style={styles.tasksTextBold}>
              {tasksCounts?.counts.completed ?? 0}
            </Text>{" "}
            /
            {tasksCounts?.counts.incomplete && tasksCounts?.counts.completed
              ? tasksCounts.counts.incomplete + tasksCounts.counts.completed
              : 0}{" "}
            tasks
          </Text>
        </View>
      </View>
      {isLoading || noTasks ? (
        <View style={styles.emptyContainer}>
          {isLoading ? (
            <ActivityIndicator color={colors.primaryColor} />
          ) : (
            <>
              <Image source={Images.noData} style={styles.noDataImage} />
              <Text style={styles.noTasksText}>No tasks found</Text>
            </>
          )}
        </View>
      ) : (
        <ScrollView
          stickyHeaderIndices={[0, 2]}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
        >
          {/* Incomplete */}
          {incompleteTasksFlat.length > 0 && (
            <View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Incomplete</Text>
                <TouchableOpacity
                  hitSlop={10}
                  onPress={() =>
                    navigate(Routes.ToDoListScreen, {
                      filterType: TASK_STATUS.INCOMPLETE,
                    })
                  }
                >
                  <Image source={Images.next} style={styles.nextImage} />
                </TouchableOpacity>
              </View>
            </View>
          )}
          {incompleteTasksFlat.length > 0 && (
            <View style={styles.gap12}>
              {incompleteTasksFlat.map((item, index) => (
                <ToDoItem key={index.toString()} {...item} />
              ))}
            </View>
          )}
          {/* Complete */}
          {completedTasksFlat.length > 0 && (
            <View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Complete</Text>
                <TouchableOpacity
                  hitSlop={10}
                  onPress={() =>
                    navigate(Routes.ToDoListScreen, {
                      filterType: TASK_STATUS.COMPLETED,
                    })
                  }
                >
                  <Image source={Images.next} style={styles.nextImage} />
                </TouchableOpacity>
              </View>
            </View>
          )}
          {completedTasksFlat.length > 0 && (
            <View style={styles.gap12}>
              {completedTasksFlat.map((item, index) => (
                <ToDoItem key={index.toString()} {...item} />
              ))}
            </View>
          )}
        </ScrollView>
      )}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigate(Routes.CreateNewToDoScreen)}
        style={styles.addBtn}
      >
        <Image source={Images.plus} style={styles.addImage} />
      </TouchableOpacity>
    </FullScreenContainer>
  );
};

export default HomeScreen;
