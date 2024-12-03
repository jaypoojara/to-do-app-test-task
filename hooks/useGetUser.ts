import { useCallback, useEffect, useState } from "react";
import StorageHelper from "@/utils/StorageHelper";

const useGetUser = () => {
  const [username, setUsername] = useState<string>();
  const [token, setToken] = useState<string>();
  const [isLoading, setLoading] = useState(true);

  const init = useCallback(async () => {
    setLoading(true);
    const username = await StorageHelper.getItem(
      StorageHelper.STORAGE_KEYS.USERNAME
    );
    const token = await StorageHelper.getItem(
      StorageHelper.STORAGE_KEYS.USER_TOKEN
    );
    setUsername(username);
    setToken(token);
    setLoading(false);
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  return { isLoading, username, token };
};

export default useGetUser;
