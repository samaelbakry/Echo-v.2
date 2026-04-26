import { getUserData } from "@/services/userServices";
import { useQuery} from "@tanstack/react-query";

export function useUserDataQuery(){
const { data: userData , isLoading } = useQuery({
    queryKey: ["getUserData"],
    queryFn: getUserData,
    select: (data) => data?.data?.data?.user,
  });
  return{userData , isLoading}
}
