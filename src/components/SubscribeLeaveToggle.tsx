import { Button } from "./ui/Button";

const SubscribeLeaveToggle = () => {
  const isSubscribed = false;

  return isSubscribed ? (
    <Button className="w-full mt-1 mb-4">Leave community</Button>
  ) : (
    <Button className="w-full mt-1 mb-4">Join to post</Button>
  );
};

export default SubscribeLeaveToggle;
