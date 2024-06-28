import { useSelector } from "react-redux";

const useCheckMyBoard = (memberId) => {
  const user = useSelector((state) => state.user);
  return user?.id === memberId;
};

export default useCheckMyBoard;
