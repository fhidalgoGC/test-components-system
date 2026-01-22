import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: 'rgba(243, 244, 246, 0.2)',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    backgroundColor: 'rgba(243, 244, 246, 0.2)',
  },
});

export const defaultCardStyles = {
  backgroundColor: '#ffffff',
  borderRadius: 12,
  borderWidth: 1,
  borderColor: '#e5e7eb',
  selectedBorderColor: '#2563eb',
  selectedBorderWidth: 3,
  shadowColor: '#000',
  shadowOffsetWidth: 0,
  shadowOffsetHeight: 1,
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 2,
};
