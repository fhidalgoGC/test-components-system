import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  Pressable 
} from 'react-native';
import { UniversalCardNative } from './client/src/lib/ui-library/components/UniversalCard/index.native';

type Screen = 'home' | 'universal-card';

interface MenuItem {
  id: Screen;
  title: string;
  description: string;
}

const menuItems: MenuItem[] = [
  {
    id: 'universal-card',
    title: 'UniversalCard',
    description: 'Flexible wrapper card component',
  },
];

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

function HomeScreen({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.heading}>GC UI Components</Text>
      <Text style={styles.subheading}>Native Component Library</Text>
      
      <View style={styles.menuContainer}>
        <Text style={styles.sectionTitle}>Components</Text>
        
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => onNavigate(item.id)}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemContent}>
              <Text style={styles.menuItemTitle}>{item.title}</Text>
              <Text style={styles.menuItemDescription}>{item.description}</Text>
            </View>
            <Text style={styles.menuItemArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

function UniversalCardScreen({ onBack }: { onBack: () => void }) {
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
      <Pressable onPress={onBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>‹ Back</Text>
      </Pressable>
      
      <Text style={styles.heading}>UniversalCard</Text>
      <Text style={styles.description}>
        A flexible wrapper card component that can render any React component with customizable styling.
      </Text>
      
      <View style={styles.cardsContainer}>
        <Text style={styles.exampleTitle}>Basic Card</Text>
        <UniversalCardNative
          component={SampleComponent}
          componentProps={{
            title: "Basic Card",
            description: "Simple card with default styling"
          }}
          width="100%"
          dataTestId="card-basic"
        />
        
        <Text style={styles.exampleTitle}>Selectable Card</Text>
        <UniversalCardNative
          component={SampleComponent}
          componentProps={{
            title: "Selectable Card",
            description: "Tap to see selection state"
          }}
          width="100%"
          selectable
          id="card-selectable"
          onSelect={(id) => console.log('Selected:', id)}
          dataTestId="card-selectable"
        />
        
        <Text style={styles.exampleTitle}>Card with Header & Footer</Text>
        <UniversalCardNative
          component={SampleComponent}
          componentProps={{
            title: "Complete Card",
            description: "With header and footer content"
          }}
          width="100%"
          headerContent={<Text style={headerFooterStyles.header}>Custom Header</Text>}
          footerContent={<Text style={headerFooterStyles.footer}>Custom Footer</Text>}
          dataTestId="card-complete"
        />
        
        <Text style={styles.exampleTitle}>Fixed Width Card</Text>
        <UniversalCardNative
          component={SampleComponent}
          componentProps={{
            title: "Fixed Width",
            description: "Width set to 280px"
          }}
          width={280}
          dataTestId="card-fixed-width"
        />
      </View>
    </ScrollView>
  );
}

const headerFooterStyles = StyleSheet.create({
  header: {
    fontWeight: '600',
    color: '#1f2937',
    fontSize: 16,
  },
  footer: {
    fontSize: 12,
    color: '#6b7280',
  },
});

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const goBack = () => {
    setCurrentScreen('home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      {currentScreen === 'home' && <HomeScreen onNavigate={navigateTo} />}
      {currentScreen === 'universal-card' && <UniversalCardScreen onBack={goBack} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  subheading: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
    marginBottom: 32,
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 24,
    lineHeight: 20,
  },
  menuContainer: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  menuItemContent: {
    flex: 1,
    gap: 4,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  menuItemArrow: {
    fontSize: 24,
    color: '#9ca3af',
    marginLeft: 12,
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#3b82f6',
    fontWeight: '500',
  },
  cardsContainer: {
    gap: 16,
  },
  exampleTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginTop: 8,
  },
});
