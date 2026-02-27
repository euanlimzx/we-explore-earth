import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '90%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    marginBottom: 8,
  },
  meta: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  rsvpStatus: {
    marginTop: 12,
    padding: 8,
    backgroundColor: '#E8F5E9',
    borderRadius: 6,
  },
  rsvpStatusText: {
    fontSize: 14,
    color: '#2E7D32',
  },
  rsvpStatusValue: {
    fontWeight: '700',
  },
  rsvpButton: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 6,
    alignItems: 'center',
  },
  rsvpButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 12,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 6,
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontWeight: '600',
  },
});
