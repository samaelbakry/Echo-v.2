import { getFollowSuggestions } from "@/services/interactionServices";
import { useQuery } from "@tanstack/react-query";

const FollowSuggestions = () => {
  const { data: suggestions } = useQuery({
    queryKey: ["getFollowSuggestions"],
    queryFn: getFollowSuggestions,
    select: (suggestions) => suggestions?.data?.suggestions,
  });
  return (
    <>
      <ul className="flex flex-col gap-3">
        {suggestions?.map((user: any) => (
          <li
            key={user._id}
            className="flex items-center justify-between p-2 rounded hover:bg-blue-50 hover:rounded-xl"
          >
            <div className="flex items-center gap-3">
              <img
                src={user.photo}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="font-medium text-sm">{user.name}</span>
                {user.username && (
                  <span className="text-xs text-gray-500">
                    @{user.username}
                  </span>
                )}
              </div>
            </div>
            <button className="followBtn">Follow</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FollowSuggestions;
