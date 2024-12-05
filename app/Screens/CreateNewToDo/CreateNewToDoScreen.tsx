import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Switch,
  Dimensions,
} from "react-native";
import { FC, useMemo, useState } from "react";
import FullScreenContainer from "@/components/FullScreenContainer";
import Input from "@/components/Input";
import colors from "@/theme/colors";
import AppButton from "@/components/AppButton";
import { isIos } from "@/utils/HelperUtils";
import { useFormik } from "formik";
import { CreateToDoValidationSchema } from "@/utils/ValidationUtils";
import moment from "moment";
import { styles } from "./styles";
import {
  useAddTaskMutation,
  useUpdateTaskMutation,
} from "@/services/task/task.query";
import { NavigationProps } from "@/types/navigation.types";
import AppHeader from "@/components/AppHeader";
import DateTimePicker from "react-native-ui-datepicker";
import CONSTANTS from "@/constants";

const CreateNewToDoScreen: FC<NavigationProps<"CreateNewToDoScreen">> = ({
  route,
}) => {
  const task = route.params;

  const { mutate: addTaskMutation, isLoading: isAddTaskLoading } =
    useAddTaskMutation();
  const { mutate: updateTaskMutation, isLoading: isUpdateTaskLoading } =
    useUpdateTaskMutation(true);

  const [isShowDatePicker, setIsShowDatePicker] = useState<boolean>(false);

  const initialValues = useMemo(() => {
    return {
      title: task?.title || "",
      description: task?.description || "",
      due_date: task?.due_date
        ? moment(
            moment.utc(task?.due_date).format(CONSTANTS.universalDateTimeFormat)
          ).toDate()
        : new Date(),
      isCompleted: task?.isCompleted || false,
    };
  }, [task]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: CreateToDoValidationSchema,
    onSubmit: async (values) => {
      const payload = {
        ...values,
        due_date: moment(values.due_date).format(
          CONSTANTS.universalDateTimeFormat
        ),
      };
      if (task?.id) {
        const updatePayload = {
          ...payload,
          isCompleted: values.isCompleted ? "1" : "0",
          id: task.id,
        };
        updateTaskMutation(updatePayload);
      } else {
        addTaskMutation(payload);
      }
    },
  });

  const {
    isValid,
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
    setFieldValue,
  } = formik;

  const isLoading = isAddTaskLoading || isUpdateTaskLoading;

  return (
    <FullScreenContainer>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={isIos ? "padding" : undefined}
      >
        <AppHeader title={`${task ? "Edit" : "Create New"} To-Do`} />
        <ScrollView
          bounces={false}
          contentContainerStyle={styles.scrollViewContent}
          style={styles.scrollView}
        >
          <View style={styles.formContainer}>
            <Input
              autoCapitalize="sentences"
              style={styles.titleInput}
              wrapperStyle={styles.inputStyle}
              placeholder="Title"
              placeholderTextColor={colors.gray1_40}
              value={values.title}
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
              error={touched.title ? errors.title : undefined}
            />
            <Input
              style={styles.descriptionInput}
              wrapperStyle={styles.inputStyle}
              placeholder="Description"
              placeholderTextColor={colors.gray1_40}
              multiline
              value={values.description}
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              error={touched.description ? errors.description : undefined}
            />
            <View style={styles.dateTimePickerContainer}>
              <View style={styles.dateTimeRow}>
                <Text style={styles.dateTimeLabel}>Date Time</Text>
                <TouchableOpacity
                  onPress={() => setIsShowDatePicker((prev) => !prev)}
                  style={styles.dateTimePickerButton}
                >
                  <Text
                    style={[
                      styles.dateTimeText,
                      {
                        color: isShowDatePicker
                          ? colors.primaryColor
                          : colors.black,
                      },
                    ]}
                  >
                    {moment(values.due_date).format(CONSTANTS.dateTimeFormat)}
                  </Text>
                </TouchableOpacity>
              </View>

              {isShowDatePicker && (
                <View style={styles.dateTimePickerWrapper}>
                  <DateTimePicker
                    date={moment(values.due_date).toDate()}
                    mode="single"
                    displayFullDays
                    timePicker
                    minDate={new Date()}
                    onChange={(value) => {
                      setFieldValue("due_date", value.date);
                    }}
                  />
                </View>
              )}
            </View>

            {task && (
              <View style={styles.completeRow}>
                <Text style={styles.dateTimeLabel}>Complete</Text>
                <Switch
                  value={values.isCompleted}
                  onValueChange={(value) => {
                    setFieldValue("isCompleted", value);
                  }}
                  trackColor={{ true: colors.success, false: colors.gray2 }}
                  thumbColor={colors.white}
                />
              </View>
            )}
          </View>
          <AppButton
            isLoading={isLoading}
            disabled={!isValid}
            title={task ? "Update" : "Create"}
            style={styles.createButton}
            onPress={() => handleSubmit()}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </FullScreenContainer>
  );
};

export default CreateNewToDoScreen;
