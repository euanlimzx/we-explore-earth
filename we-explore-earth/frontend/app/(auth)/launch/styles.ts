import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
  },
  
  welcomeSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  title: {
    fontSize: 24,
    color: '#6c757d',
    marginBottom: 8,
    fontWeight: '300',
  },
  
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 24,
    textAlign: 'center',
  },
  
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  
  buttonSection: {
    gap: 16,
  },
  
  loginButton: {
    backgroundColor: '#3498db',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#3498db',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  
  signupButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#3498db',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  
  signupButtonText: {
    color: '#3498db',
    fontSize: 18,
    fontWeight: '600',
  },
});