import {
  AddTaskPayload,
  AddTaskResponse,
  GetTaskCountsResponse,
  GetTaskParams,
  GetTaskResponse,
  UpdateTaskPayload,
} from "@/types/service.types";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { QUERY_KEY } from "../queryKeys";
import { axiosInstance } from "../axios";
import {
  ErrorToast,
  getNextPageParam,
  isResponseError,
  SuccessToast,
} from "@/utils/HelperUtils";
import {
  goBack,
  goBackWithParams,
  navigationRef,
  replace,
} from "@/utils/NavigationUtils";
import Routes from "@/constants/routes";

export const useGetTaskQuery = (payload?: GetTaskParams) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.GET_TASK, JSON.stringify(payload)],
    queryFn: async ({ pageParam = payload?.page ?? 10 }) => {
      const params = { ...payload, page: pageParam };
      if (!payload?.search) {
        delete params.search;
      }

      const response = await axiosInstance.get<GetTaskResponse>("tasks", {
        params,
      });
      return response.data;
    },
    getNextPageParam: getNextPageParam,
  });
};

export const useGetTaskCountsQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_TASK_COUNTS],
    queryFn: async () => {
      const response = await axiosInstance.get<GetTaskCountsResponse>(
        "tasks/counts"
      );
      return response.data;
    },
  });
};

export const useAddTaskMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_KEY.ADD_TASK],
    mutationFn: async (payload: AddTaskPayload) => {
      const { data } = await axiosInstance.post<AddTaskResponse>(
        `tasks`,
        payload
      );
      return data;
    },
    onSuccess: async (response) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_TASK],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_TASK_COUNTS],
      });
      SuccessToast("Task created successfully");
      replace(Routes.ToDoDetailsScreen, response.task);
    },
    onError: (error: Error) => {
      let errorMessage = "Something went wrong";
      if (isResponseError(error)) {
        errorMessage = error?.response?.data?.message;
      }
      ErrorToast(errorMessage);
    },
  });
};

export const useUpdateTaskMutation = (isGoBack?: boolean) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_KEY.UPDATE_TASK],
    mutationFn: async (payload: UpdateTaskPayload) => {
      const { data } = await axiosInstance.put<AddTaskResponse>(
        `/tasks/${payload.id}`,
        payload
      );
      return data;
    },
    onSuccess: async (response) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_TASK],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_TASK_COUNTS],
      });
      SuccessToast("Task updated successfully");
      if (isGoBack) {
        goBackWithParams(Routes.ToDoDetailsScreen, response.task);
      } else {
        navigationRef.setParams(response.task);
      }
    },
    onError: (error: Error) => {
      let errorMessage = "Something went wrong";
      if (isResponseError(error)) {
        errorMessage = error?.response?.data?.message;
      }
      ErrorToast(errorMessage);
    },
  });
};

export const useDeleteTaskMutation = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_KEY.DELETE_TASK],
    mutationFn: async () => {
      const { data } = await axiosInstance.delete(`/tasks/${id}`);
      return data;
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_TASK],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_TASK_COUNTS],
      });
      SuccessToast("Task deleted successfully");
      goBack();
    },
    onError: (error: Error) => {
      let errorMessage = "Something went wrong";
      if (isResponseError(error)) {
        errorMessage = error?.response?.data?.message;
      }
      ErrorToast(errorMessage);
    },
  });
};
