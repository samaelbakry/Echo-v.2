import { getAllNotifications, markAllNotificationsAsRead} from "@/services/notificationsServices";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Separator } from "../ui/separator";
import type { NotificationType } from "@/types/notificationsType";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { toast } from "react-toastify";


const Notifications = () => {

  const { data } = useQuery({
    queryKey: ["getNotifications"],
    queryFn: getAllNotifications,
    select: (data) => data.data.notifications,
  });

   const queryClient =useQueryClient()

async function markAllAsRead() {
    const response = await markAllNotificationsAsRead()
    toast.success("No more notifications!")
    console.log(response);
    queryClient.invalidateQueries({queryKey:["getNotifications"]})
}

  return (
    <>
      {data?.length === 0 ?  <span className="text-center text-base">No notifications yet</span> : <>
      <div className="flex items-center justify-between text-blue-900 mb-2">
        <div className="flex flex-col gap-1">
          <span>Notifications</span>
          <span className="text-sm">you have {data?.length}{" "}{Number(data?.length) <= 1 ? "notification": "new notifications"}{" "} </span>
        </div>
        <IoCheckmarkDoneOutline className="text-xl cursor-pointer" onClick={markAllAsRead}/>
      </div>
      <Separator orientation="horizontal" />
      {data?.map((notification:NotificationType , index:number)=>(
      <div key={index} className="flex items-center gap-2 bg-blue-50/80 p-2 rounded-2xl my-2">
            <img src={notification.actor.photo} alt={notification.actor.name} className="size-6 rounded-full" />
        <div className="flex flex-col gap-1 flex-wrap">
         <div className="flex items-center gap-1 flex-wrap">
          <span className="text-sm">{notification.actor.name}</span>
          <span className="text-sm">{new Date(notification.createdAt).toLocaleString("en-us", { timeStyle: "short"})}</span>
          
         </div>
          <span className="text-sm flex items-center gap-1">
            {notification.type + " on your post"}  
          </span>
        </div>
      </div>
      ))}
      </>}
      
    </>
  );
};

export default Notifications;
