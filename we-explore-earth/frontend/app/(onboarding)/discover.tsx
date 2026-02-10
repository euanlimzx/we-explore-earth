import OnboardingPage from './components/onboarding-page';

export default function DiscoverPage() {
  return (
    <OnboardingPage
      title="Discover trails and events near you"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      nextRoute="/(onboarding)/join"
    />
  );
}