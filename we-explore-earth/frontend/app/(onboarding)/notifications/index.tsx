import OnboardingPage from '../components/onboardingPage';
import { useAppSelector } from '@/app/redux/hooks';

export default function NotificationsPage() {

const user = useAppSelector(state => state.user);
var route = "";

if(user?.isAdmin)
{
  route = "/(admin)/home";
}
else
{
  route = "/(users)/home";
}

  return (
    <OnboardingPage
      title="Turn on Notifications"
      nextRoute={route}
    />
  );
}