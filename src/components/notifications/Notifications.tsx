import {
  getAllNotifications,
  markAllNotificationsAsRead,
} from "@/services/notificationsServices";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Separator } from "../ui/separator";
import type { NotificationType } from "@/types/notificationsType";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { Badge } from "../ui/badge";

const Notifications = () => {
  const { data } = useQuery({
    queryKey: ["getNotifications"],
    queryFn: getAllNotifications,
    select: (data) => data.data.notifications,
  });

  const queryClient = useQueryClient();

  async function markAllAsRead() {
    const response = await markAllNotificationsAsRead();
    toast.success("No more notifications!");
    console.log(response);
    queryClient.invalidateQueries({ queryKey: ["getNotifications"] });
  }

  return (
    <>
      {data?.length === 0 ? (
        <span className="text-center text-sm text-gray-500 py-6">
          <HiOutlineBellAlert className=" inline-block mr-2  text-sm" />
          No notifications yet
        </span>
      ) : (
        <>
          <div className="flex items-center justify-between mb-3">
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-2 font-medium text-blue-900">
                Notifications
                <Badge className="bg-red-100 text-red-600 px-2 py-0.5">
                  <HiOutlineBellAlert className="text-red-500 text-sm" />
                </Badge>
              </span>

              <span className="text-xs text-gray-500">
                you have {data?.length}{" "}
                {Number(data?.length) <= 1
                  ? "notification"
                  : "new notifications"}
              </span>
            </div>

            <IoCheckmarkDoneOutline
              className="text-xl cursor-pointer text-gray-600 hover:text-blue-600 transition"
              onClick={markAllAsRead}
            />
          </div>

          <Separator orientation="horizontal" className="mb-2" />

          <div className="flex flex-col gap-2 mt-2">
            {data?.map((notification: NotificationType, index: number) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-blue-50/70 hover:bg-blue-50 p-3 rounded-xl transition"
              >
                <img
                  src={notification.actor.photo}
                  alt={notification.actor.name}
                  className="w-8 h-8 rounded-full object-cover"
                />

                <div className="flex flex-col text-sm leading-tight">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-gray-800">
                      {notification.actor.name}
                    </span>

                    <span className="text-xs text-gray-500">
                      {new Date(notification.createdAt).toLocaleString(
                        "en-us",
                        {
                          timeStyle: "short",
                        },
                      )}
                    </span>
                  </div>
                  <span className="text-gray-600 text-sm">
                    {notification.type} on your post
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Notifications;
