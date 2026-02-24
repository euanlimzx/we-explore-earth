import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'space-between', 
  },
  imagePlaceholder: {
    flex: 0.5,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  placeholderText: { color: '#888' },
  contentContainer: {
    flex: 0.4,
    alignItems: 'center',
    gap: 20,
  },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  description: { fontSize: 16, textAlign: 'center', color: '#666' },
  button: {
    backgroundColor: '#D3D3D3',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
    marginTop: 60,
  },
  buttonText: { fontSize: 16, fontWeight: '600' },
});

