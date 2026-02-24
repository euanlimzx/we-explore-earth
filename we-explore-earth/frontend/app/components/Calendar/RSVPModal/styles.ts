import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '85%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  loader: {
    marginVertical: 20,
  },
  optionButton: {
    width: '100%',
    padding: 14,
    marginBottom: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  optionButtonSelected: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  optionTextSelected: {
    color: '#2E7D32',
  },
  removeButton: {
    marginTop: 8,
    padding: 10,
  },
  removeText: {
    color: '#F44336',
    fontSize: 14,
    fontWeight: '500',
  },
  cancelButton: {
    marginTop: 12,
    padding: 10,
  },
  cancelText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
});
