import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
  RefreshControl,
  Keyboard,
} from "react-native";
import { FC, useCallback, useMemo, useState } from "react";
import { getTasksFlatData, isIos } from "@/utils/HelperUtils";
import { Images } from "@/constants/images";
import colors from "@/theme/colors";
import { styles } from "./styles";
import { NavigationProps } from "@/types/navigation.types";
import FullScreenContainer from "@/components/FullScreenContainer";
import Input from "@/components/Input";
import ToDoItem from "@/components/ToDoItem";
import { useGetTaskQuery } from "@/services/task/task.query";
import { useSearch } from "@/hooks/useSearch";
import { TASK_STATUS } from "@/types/service.types";
import AppHeader from "@/components/AppHeader";

const filterOptions = [
  { name: "All", value: undefined },
  { name: "Incomplete", value: TASK_STATUS.INCOMPLETE },
  { name: "Complete", value: TASK_STATUS.COMPLETED },
];

const ToDoListScreen: FC<NavigationProps<"ToDoListScreen">> = ({ route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [filterType, setFilterType] = useState<TASK_STATUS | undefined>(
    route.params?.filterType
  );

  const [debouncedSearchText, setSearchText, searchText] = useSearch();

  const handleSelectFilterType = useCallback((type?: TASK_STATUS) => {
    setModalVisible(false);
    setFilterType(type);
  }, []);

  const {
    data: tasksData,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isRefetching,
    refetch,
  } = useGetTaskQuery({
    page: 1,
    pageSize: 10,
    search: debouncedSearchText,
    isCompleted: filterType,
  });

  const tasksFlat = useMemo(() => {
    return getTasksFlatData(tasksData);
  }, [tasksData]);

  const handlerOnEndReached = () => {
    if (hasNextPage && !isFetchingNextPage && !isLoading && !isRefetching) {
      fetchNextPage();
    }
  };

  const listFooterComponent = () =>
    isFetchingNextPage && hasNextPage ? (
      <ActivityIndicator color={colors.primaryColor} />
    ) : null;

  const onRefresh = () => {
    Keyboard.dismiss();
    setSearchText("");
    setFilterType(undefined);
    refetch();
  };

  return (
    <FullScreenContainer>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={isIos ? "padding" : undefined}
      >
        <View style={styles.headerContainer}>
          <AppHeader
            title="To-Do List"
            rightIcon={Images.filter}
            onRightPress={() => setModalVisible(true)}
          />
          <Input
            leftIcon={Images.search}
            leftStyle={styles.searchIcon}
            wrapperStyle={styles.searchWrapper}
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor={colors.gray1}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <FlatList
          contentContainerStyle={styles.flatListContent}
          style={styles.flatList}
          data={tasksFlat}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <ToDoItem {...item} />}
          ListEmptyComponent={
            <>
              {isLoading ? (
                <ActivityIndicator color={colors.primaryColor} />
              ) : (
                <View style={styles.emptyContainer}>
                  <Image source={Images.noData} style={styles.noDataImage} />
                  <Text style={styles.noTasksText}>No tasks found</Text>
                </View>
              )}
            </>
          }
          refreshControl={
            <RefreshControl
              tintColor={colors.primaryColor}
              colors={[colors.primaryColor]}
              refreshing={isRefetching}
              onRefresh={onRefresh}
            />
          }
          onEndReachedThreshold={0.2}
          onEndReached={handlerOnEndReached}
          ListFooterComponent={listFooterComponent}
        />
      </KeyboardAvoidingView>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
          style={styles.modalOverlay}
        >
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Filter</Text>
                <TouchableOpacity
                  hitSlop={12}
                  onPress={() => setModalVisible(false)}
                  activeOpacity={0.8}
                >
                  <Image source={Images.plus} style={styles.closeIcon} />
                </TouchableOpacity>
              </View>
              <View>
                {filterOptions.map((item, index) => (
                  <TouchableOpacity
                    key={index.toString()}
                    onPress={() => handleSelectFilterType(item.value)}
                    style={[
                      styles.filterOption,
                      filterType === item.value && styles.activeFilterOption,
                    ]}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        filterType === item.value &&
                          styles.activeFilterOptionText,
                      ]}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </FullScreenContainer>
  );
};

export default ToDoListScreen;
