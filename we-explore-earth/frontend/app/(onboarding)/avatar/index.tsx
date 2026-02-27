import OnboardingPage from '../components/onboardingPage';

export default function AvatarPage() {
  return (
    <OnboardingPage
      title="Choose an avatar!"
      description="Find one that represents you"
      nextRoute="/(onboarding)/notifications"
    />
  );
}