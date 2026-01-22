import { StatusBar } from 'expo-status-bar';
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { UniversalCardNative } from './client/src/lib/ui-library/components/UniversalCard/index.native';

const SampleComponent = ({ title, description }: { title: string; description: string }) => (
  <View style={sampleStyles.container}>
    <Text style={sampleStyles.title}>{title}</Text>
    <Text style={sampleStyles.description}>{description}</Text>
  </View>
);

const sampleStyles = StyleSheet.create({
  container: {
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.heading}>
          GC UI Components - Native
        </Text>
        
        <View style={styles.cardsContainer}>
          <UniversalCardNative
            component={SampleComponent}
            componentProps={{
              title: "Card 1",
              description: "This is a native UniversalCard using React Native"
            }}
            width={300}
            dataTestId="card-1"
          />
          
          <UniversalCardNative
            component={SampleComponent}
            componentProps={{
              title: "Card 2",
              description: "Selectable card example"
            }}
            width={300}
            selectable
            id="card-2"
            onSelect={(id) => console.log('Selected:', id)}
            dataTestId="card-2"
          />
          
          <UniversalCardNative
            component={SampleComponent}
            componentProps={{
              title: "Card with Header & Footer",
              description: "Complete card example"
            }}
            width={300}
            headerContent={<Text style={headerFooterStyles.header}>Header</Text>}
            footerContent={<Text style={headerFooterStyles.footer}>Footer</Text>}
            dataTestId="card-3"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const headerFooterStyles = StyleSheet.create({
  header: {
    fontWeight: '600',
    color: '#1f2937',
  },
  footer: {
    fontSize: 12,
    color: '#6b7280',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#1f2937',
  },
  cardsContainer: {
    gap: 16,
  },
});
