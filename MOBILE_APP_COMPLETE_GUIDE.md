# OmniBins Mobile App - Complete Guide to All Files & Syntax

This guide explains every file in the mobile app, its purpose, and the syntax used. Perfect for customization!

---

## 📁 Project Structure Overview

```
Mobile/OmniBins/
├── app/                          # Routing & Screen files (Expo Router)
│   ├── _layout.tsx              # Root layout wrapper
│   ├── modal.tsx                # Modal screen example
│   └── (tabs)/                  # Tab-based navigation group
│       ├── _layout.tsx          # Tab navigation setup
│       ├── index.tsx            # Home screen
│       └── explore.tsx          # Explore/educational screen
├── components/                   # Reusable UI components
│   ├── hello-wave.tsx           # Animated waving emoji
│   ├── haptic-tab.tsx           # Tab button with haptic feedback
│   ├── parallax-scroll-view.tsx # Scrollable container with parallax effect
│   ├── themed-text.tsx          # Theme-aware text component
│   ├── themed-view.tsx          # Theme-aware view/container
│   ├── external-link.tsx        # Link component
│   └── ui/                      # UI sub-components
│       ├── collapsible.tsx      # Expandable sections
│       ├── icon-symbol.tsx      # Icon component
│       └── icon-symbol.ios.tsx  # iOS-specific icon variant
├── constants/
│   └── theme.ts                 # Color themes & fonts
├── hooks/                        # Custom React hooks
│   ├── use-color-scheme.ts      # Detect light/dark theme
│   ├── use-color-scheme.web.ts  # Web-specific color scheme
│   └── use-theme-color.ts       # Get theme-aware colors
├── assets/
│   └── images/                  # App images (icons, splash, etc.)
├── scripts/
│   └── reset-project.js         # Reset to fresh app
├── package.json                 # Dependencies & scripts
├── tsconfig.json               # TypeScript configuration
├── eslint.config.js            # Code linting rules
├── app.json                    # Expo app configuration
└── expo-env.d.ts              # TypeScript environment types
```

---

## 🔧 Configuration Files

### 1. **app.json** - Expo App Configuration
**Location:** [Mobile/OmniBins/app.json](Mobile/OmniBins/app.json)
**Purpose:** Main configuration file for the Expo app. Defines app metadata, permissions, and build settings.

```json
{
  "expo": {
    "name": "OmniBins",              // App display name
    "slug": "OmniBins",              // URL-safe identifier
    "version": "1.0.0",              // Semantic version
    "orientation": "portrait",       // Screen orientation lock
    "icon": "./assets/images/icon.png", // App icon
    "scheme": "omnibins",            // Deep linking scheme (omnibins://)
    "userInterfaceStyle": "automatic", // Light/dark mode
    "newArchEnabled": true,          // Enable React Native New Architecture
    "ios": {
      "supportsTablet": true         // iPad support
    },
    "android": {
      "adaptiveIcon": {
        "backgroundColor": "#E6F4FE", // Icon background color
        "foregroundImage": "./assets/images/android-icon-foreground.png",
        "backgroundImage": "./assets/images/android-icon-background.png",
        "monochromeImage": "./assets/images/android-icon-monochrome.png"
      },
      "edgeToEdgeEnabled": true      // Full-screen edge-to-edge support
    },
    "web": {
      "output": "static",            // Build output type
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",                 // File-based routing plugin
      ["expo-splash-screen", { ... }] // Splash screen config
    ],
    "experiments": {
      "typedRoutes": true,           // Type-safe route names
      "reactCompiler": true          // Use React Compiler (optimizations)
    }
  }
}
```

**Customization Tips:**
- Change `name` to your app name
- Update `icon` path to your custom icon
- Modify `backgroundColor` for Android adaptive icon
- Change `scheme` for deep linking URLs

---

### 2. **package.json** - Dependencies & Scripts
**Location:** [Mobile/OmniBins/package.json](Mobile/OmniBins/package.json)
**Purpose:** Lists all npm packages, versions, and custom scripts.

```json
{
  "name": "omnibins",              // Project name
  "main": "expo-router/entry",     // Entry point
  "version": "1.0.0",              // Version number
  "scripts": {
    "start": "expo start",          // Start dev server
    "reset-project": "node ./scripts/reset-project.js", // Reset to template
    "android": "expo start --android", // Run on Android
    "ios": "expo start --ios",      // Run on iOS simulator
    "web": "expo start --web",      // Run in web browser
    "lint": "expo lint"             // Check code quality
  },
  "dependencies": {
    "expo": "~54.0.33",             // Core Expo framework
    "react": "19.1.0",              // React library
    "react-native": "0.81.5",       // React Native library
    "expo-router": "~6.0.23",       // File-based routing
    "react-native-reanimated": "~4.1.1", // Smooth animations
    "@react-navigation/bottom-tabs": "^7.4.0", // Tab navigation
    "@expo/vector-icons": "^15.0.3", // Icon library
    "expo-haptics": "~15.0.8",      // Vibration/haptic feedback
    "expo-image": "~3.0.11",        // Optimized image component
    "expo-constants": "~18.0.13",   // App constants
    "expo-font": "~14.0.11"         // Font loading
  },
  "devDependencies": {
    "typescript": "~5.9.2",         // TypeScript compiler
    "eslint": "^9.25.0"             // Code linter
  }
}
```

**Key Packages Explained:**
- `expo-router`: Enables file-based routing (like Next.js)
- `react-native-reanimated`: Smooth 60fps animations
- `@react-navigation`: Navigation between screens
- `expo-haptics`: Device vibration feedback

---

### 3. **tsconfig.json** - TypeScript Configuration
**Location:** [Mobile/OmniBins/tsconfig.json](Mobile/OmniBins/tsconfig.json)
**Purpose:** Configures TypeScript compiler behavior.

```json
{
  "extends": "expo/tsconfig.base",  // Inherit Expo's base config
  "compilerOptions": {
    "strict": true,                 // Enable all strict type checks
    "paths": {
      "@/*": ["./*"]               // Path alias: @/X maps to ./X
    }
  },
  "include": [
    "**/*.ts",                      // Include all TypeScript files
    "**/*.tsx",                     // Include JSX files
    ".expo/types/**/*.ts",          // Expo generated types
    "expo-env.d.ts"                 // Environment types
  ]
}
```

**Path Alias Usage:**
Instead of: `import X from '../../../components/X'`
Use: `import X from '@/components/X'`

---

### 4. **eslint.config.js** - Code Linting Rules
**Location:** [Mobile/OmniBins/eslint.config.js](Mobile/OmniBins/eslint.config.js)
**Purpose:** Enforces code quality and consistency.

```javascript
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,                       // Use Expo's recommended rules
  {
    ignores: ['dist/*'],           // Don't lint build output
  },
]);
```

**Usage:**
```bash
npm run lint  # Check code quality
```

---

## 🎯 Routing & Navigation Files

### 5. **app/_layout.tsx** - Root Layout Wrapper
**Location:** [Mobile/OmniBins/app/_layout.tsx](Mobile/OmniBins/app/_layout.tsx)
**Purpose:** Top-level wrapper for the entire app. Applies themes, status bar, and root navigation.

```typescript
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',  // Set tabs as default screen
};

export default function RootLayout() {
  // Get current color scheme (light or dark)
  const colorScheme = useColorScheme();

  return (
    // Apply theme (light or dark) globally
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* Stack navigation: handles modal presentation */}
      <Stack>
        {/* Show tabs group as main navigator (no header) */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        
        {/* Modal screen - appears on top */}
        <Stack.Screen 
          name="modal" 
          options={{ 
            presentation: 'modal',  // Slide up from bottom
            title: 'Modal' 
          }} 
        />
      </Stack>
      
      {/* Status bar (battery, time, signal) */}
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
```

**Key Concepts:**
- **Stack Navigation**: Manages screen transitions with history
- **presentation: 'modal'**: Screen slides up from bottom (iOS) or fades in (Android)
- **unstable_settings**: Specifies initial route
- **ThemeProvider**: Makes theme available to all child components

---

### 6. **app/(tabs)/_layout.tsx** - Tab Navigation Setup
**Location:** [Mobile/OmniBins/app/(tabs)/_layout.tsx](Mobile/OmniBins/app/(tabs)/_layout.tsx)
**Purpose:** Creates bottom tab navigation with two screens (Home & Explore).

```typescript
import { Tabs } from 'expo-router';
import React from 'react';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();  // Get light/dark mode

  return (
    <Tabs
      screenOptions={{
        // Color when tab is selected
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,            // Don't show header on tab screens
        tabBarButton: HapticTab,       // Custom tab button with vibration
      }}>
      
      {/* HOME TAB */}
      <Tabs.Screen
        name="index"                   // Maps to app/(tabs)/index.tsx
        options={{
          title: 'Home',              // Bottom label
          tabBarIcon: ({ color }) => (
            // House icon with dynamic color
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      
      {/* EXPLORE TAB */}
      <Tabs.Screen
        name="explore"                 // Maps to app/(tabs)/explore.tsx
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            // Plane icon with dynamic color
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```

**How File-Based Routing Works:**
- File structure = route structure
- `app/(tabs)/index.tsx` = `/` home screen
- `app/(tabs)/explore.tsx` = `/explore` screen
- `(tabs)` = grouping folder, not part of URL

---

### 7. **app/(tabs)/index.tsx** - Home Screen
**Location:** [Mobile/OmniBins/app/(tabs)/index.tsx](Mobile/OmniBins/app/(tabs)/index.tsx)
**Purpose:** Welcome screen with getting started instructions.

```typescript
import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';
import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ParallaxScrollView  // Scrollable container with parallax header
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      
      {/* Welcome Section */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />  {/* Animated waving emoji */}
      </ThemedView>

      {/* Step 1 */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',      // iOS shortcut
              android: 'cmd + m',  // Android shortcut
              web: 'F12',          // Web shortcut
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>

      {/* Step 2: Link Example */}
      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">  {/* Navigation to modal screen */}
          <Link.Trigger>     {/* Pressable area */}
            <ThemedText type="subtitle">Step 2: Explore</ThemedText>
          </Link.Trigger>
          
          {/* Preview shown on long-press */}
          <Link.Preview />
          
          {/* Context menu with actions */}
          <Link.Menu>
            <Link.MenuAction 
              title="Action" 
              icon="cube" 
              onPress={() => alert('Action pressed')} 
            />
            <Link.MenuAction
              title="Share"
              icon="square.and.arrow.up"
              onPress={() => alert('Share pressed')}
            />
            {/* Nested menu */}
            <Link.Menu title="More" icon="ellipsis">
              <Link.MenuAction
                title="Delete"
                icon="trash"
                destructive  {/* Red color for delete */}
                onPress={() => alert('Delete pressed')}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>
      </ThemedView>

      {/* Step 3 */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          Run <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> 
          to get a fresh app directory.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

// Styling with React Native StyleSheet (replaces CSS)
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',    // Horizontal layout
    alignItems: 'center',    // Vertically center
    gap: 8,                  // Space between items (8 pixels)
  },
  stepContainer: {
    gap: 8,                  // Space between children
    marginBottom: 8,         // Space below this container
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',    // Position over other content
  },
});
```

**Key Syntax Explanations:**
- `StyleSheet.create()`: Optimized style definitions (converts to native)
- `flexDirection: 'row'`: Horizontal layout (default is 'column' = vertical)
- `gap`: Space between flex children
- `Platform.select()`: Choose value based on OS (ios/android/web)

---

### 8. **app/(tabs)/explore.tsx** - Educational Content Screen
**Location:** [Mobile/OmniBins/app/(tabs)/explore.tsx](Mobile/OmniBins/app/(tabs)/explore.tsx)
**Purpose:** Shows educational content about Expo, React Native, and animation capabilities.

```typescript
// Typically contains:
// - File-based routing explanation
// - Platform support info (Android/iOS/Web)
// - Theme switching instructions
// - Links to documentation
// - Reanimated animation examples
```

---

### 9. **app/modal.tsx** - Modal Screen Example
**Location:** [Mobile/OmniBins/app/modal.tsx](Mobile/OmniBins/app/modal.tsx)
**Purpose:** Example modal screen that appears on top of other screens.

Accessed via `Link href="/modal"` from home screen.

---

## 🎨 Component Files

### 10. **components/themed-text.tsx** - Theme-Aware Text Component
**Location:** [Mobile/OmniBins/components/themed-text.tsx](Mobile/OmniBins/components/themed-text.tsx)
**Purpose:** Text component that automatically uses light/dark colors based on theme.

```typescript
import { StyleSheet, Text, type TextProps } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;    // Custom light mode color
  darkColor?: string;     // Custom dark mode color
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  // Get color based on light/dark theme
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },  // Apply theme color
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,  // User-provided styles
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',  // Semi-bold weight
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',  // Teal blue
  },
});
```

**Usage:**
```tsx
<ThemedText type="title">Welcome!</ThemedText>
<ThemedText type="subtitle">Subheading</ThemedText>
<ThemedText type="default">Normal text</ThemedText>
<ThemedText type="link" onPress={() => alert('Clicked!')}>Link</ThemedText>
```

---

### 11. **components/themed-view.tsx** - Theme-Aware Container
**Location:** [Mobile/OmniBins/components/themed-view.tsx](Mobile/OmniBins/components/themed-view.tsx)
**Purpose:** Container that automatically uses light/dark background colors.

```typescript
import { View, type ViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;    // Custom light background
  darkColor?: string;     // Custom dark background
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  // Get background color based on theme
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor }, 
    'background'
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
```

**Usage:**
```tsx
<ThemedView style={{ padding: 20 }}>
  <ThemedText>Content inside themed container</ThemedText>
</ThemedView>
```

---

### 12. **components/parallax-scroll-view.tsx** - Scrollable with Parallax Effect
**Location:** [Mobile/OmniBins/components/parallax-scroll-view.tsx](Mobile/OmniBins/components/parallax-scroll-view.tsx)
**Purpose:** Creates smooth parallax scrolling effect where header moves slower than content.

```typescript
import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
} from 'react-native-reanimated';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeColor } from '@/hooks/use-theme-color';

const HEADER_HEIGHT = 250;  // Fixed header height

type Props = PropsWithChildren<{
  headerImage: ReactElement;  // Image to show in header
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
}: Props) {
  const backgroundColor = useThemeColor({}, 'background');
  const colorScheme = useColorScheme() ?? 'light';
  
  // Ref to animated scroll view
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  
  // Track scroll position
  const scrollOffset = useScrollOffset(scrollRef);
  
  // Animate header based on scroll
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          // Move header slower than content (parallax effect)
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          // Zoom in when scrolling up
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]  // 2x when scrolled up, 1x when normal
          ),
        },
      ],
    };
  });

  return (
    <Animated.ScrollView
      ref={scrollRef}
      style={{ backgroundColor, flex: 1 }}
      scrollEventThrottle={16}>  {/* Update 60 times per second */}
      
      {/* Animated header */}
      <Animated.View
        style={[
          styles.header,
          { backgroundColor: headerBackgroundColor[colorScheme] },
          headerAnimatedStyle,  // Apply animations
        ]}>
        {headerImage}
      </Animated.View>
      
      {/* Scrollable content */}
      <ThemedView style={styles.content}>{children}</ThemedView>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',  // Clip content to header size
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});
```

**Key Animation Concepts:**
- `useAnimatedRef`: Reference to animated component
- `useScrollOffset`: Tracks scroll position
- `useAnimatedStyle`: Updates styles based on animations
- `interpolate`: Maps input range to output range (e.g., 0-250px scroll → 1-2 scale)
- `scrollEventThrottle`: Limits animation updates (16 = 60 FPS)

---

### 13. **components/haptic-tab.tsx** - Tab Button with Vibration
**Location:** [Mobile/OmniBins/components/haptic-tab.tsx](Mobile/OmniBins/components/haptic-tab.tsx)
**Purpose:** Custom tab button that vibrates when pressed (iOS only).

```typescript
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';

export function HapticTab(props: BottomTabBarButtonProps) {
  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === 'ios') {
          // Trigger light haptic feedback on iOS only
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        // Call original handler
        props.onPressIn?.(ev);
      }}
    />
  );
}
```

**Haptic Feedback Styles:**
- `Light`: Gentle vibration
- `Medium`: Standard vibration
- `Heavy`: Strong vibration
- `Rigid`: Hard bump
- `Soft`: Soft tap

---

### 14. **components/hello-wave.tsx** - Animated Waving Emoji
**Location:** [Mobile/OmniBins/components/hello-wave.tsx](Mobile/OmniBins/components/hello-wave.tsx)
**Purpose:** Displays a waving hand emoji with rotation animation.

```typescript
import Animated from 'react-native-reanimated';

export function HelloWave() {
  return (
    <Animated.Text
      style={{
        fontSize: 28,
        lineHeight: 32,
        marginTop: -6,
        animationName: {
          '50%': { transform: [{ rotate: '25deg' }] }  // Rotate at 50%
        },
        animationIterationCount: 4,  // Wave 4 times
        animationDuration: '300ms',   // Total animation time
      }}>
      👋  {/* Waving hand emoji */}
    </Animated.Text>
  );
}
```

---

## 🎨 Constants & Theme Files

### 15. **constants/theme.ts** - Color & Font Definitions
**Location:** [Mobile/OmniBins/constants/theme.ts](Mobile/OmniBins/constants/theme.ts)
**Purpose:** Centralized theme colors and fonts (light/dark modes).

```typescript
import { Platform } from 'react-native';

// Define primary colors
const tintColorLight = '#0a7ea4';   // Teal blue (light mode)
const tintColorDark = '#fff';       // White (dark mode)

// Export color theme
export const Colors = {
  light: {
    text: '#11181C',                // Dark text in light mode
    background: '#fff',             // White background
    tint: tintColorLight,           // Accent color
    icon: '#687076',                // Icon color
    tabIconDefault: '#687076',      // Inactive tab color
    tabIconSelected: tintColorLight, // Active tab color
  },
  dark: {
    text: '#ECEDEE',                // Light text in dark mode
    background: '#151718',          // Dark background
    tint: tintColorDark,            // Accent color
    icon: '#9BA1A6',                // Icon color
    tabIconDefault: '#9BA1A6',      // Inactive tab color
    tabIconSelected: tintColorDark, // Active tab color
  },
};

// Platform-specific fonts
export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',              // iOS system sans-serif
    serif: 'ui-serif',              // iOS system serif
    rounded: 'ui-rounded',          // iOS system rounded
    mono: 'ui-monospace',           // iOS system monospace
  },
  default: {
    // Android/default fonts
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    // Web fonts with fallbacks
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
```

**Usage:**
```typescript
import { Colors } from '@/constants/theme';

const textColor = Colors['light'].text;  // Get light mode text color
const accentColor = Colors['dark'].tint;  // Get dark mode accent color
```

---

## 🪝 Custom Hooks Files

### 16. **hooks/use-color-scheme.ts** - Color Scheme Detection
**Location:** [Mobile/OmniBins/hooks/use-color-scheme.ts](Mobile/OmniBins/hooks/use-color-scheme.ts)
**Purpose:** Hook to detect and use light/dark theme preference.

```typescript
export { useColorScheme } from 'react-native';
```

**Usage:**
```typescript
const colorScheme = useColorScheme();  // Returns 'light' or 'dark'

if (colorScheme === 'dark') {
  // Use dark theme colors
}
```

---

### 17. **hooks/use-color-scheme.web.ts** - Web-Specific Color Scheme
**Location:** [Mobile/OmniBins/hooks/use-color-scheme.web.ts](Mobile/OmniBins/hooks/use-color-scheme.web.ts)
**Purpose:** Web-specific version of color scheme detection (Expo handles file .web.ts automatically).

---

### 18. **hooks/use-theme-color.ts** - Theme-Aware Color Hook
**Location:** [Mobile/OmniBins/hooks/use-theme-color.ts](Mobile/OmniBins/hooks/use-theme-color.ts)
**Purpose:** Hook that returns appropriate color based on current theme.

```typescript
// Typical implementation:
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export function useThemeColor(
  { light, dark }: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light | keyof typeof Colors.dark
) {
  const colorScheme = useColorScheme();
  const colorFromScheme = Colors[colorScheme ?? 'light'][colorName];

  // Return custom color if provided, otherwise use theme color
  return light && colorScheme === 'light' ? light : 
         dark && colorScheme === 'dark' ? dark : 
         colorFromScheme;
}
```

**Usage:**
```typescript
const textColor = useThemeColor({}, 'text');
const customColor = useThemeColor({ light: '#red', dark: '#orange' }, 'text');
```

---

## 📁 Other Important Files

### 19. **scripts/reset-project.js** - Project Reset Script
**Location:** [Mobile/OmniBins/scripts/reset-project.js](Mobile/OmniBins/scripts/reset-project.js)
**Purpose:** Backs up current app and resets to Expo template.

**Run with:**
```bash
npm run reset-project
```

---

### 20. **expo-env.d.ts** - TypeScript Environment Types
**Location:** [Mobile/OmniBins/expo-env.d.ts](Mobile/OmniBins/expo-env.d.ts)
**Purpose:** TypeScript type definitions for Expo environment variables.

```typescript
// Auto-generated file that provides types for Expo modules
```

---

## 🎯 React Native Syntax Essentials

### Layout Styles (Flexbox)
```typescript
const styles = StyleSheet.create({
  // Horizontal layout
  row: {
    flexDirection: 'row',      // Arrange horizontally
    justifyContent: 'center',  // Center horizontally
    alignItems: 'center',      // Center vertically
  },
  
  // Vertical layout (default)
  column: {
    flexDirection: 'column',
    justifyContent: 'flex-start',  // Top alignment
    alignItems: 'stretch',         // Full width
  },
  
  // Spacing
  spaced: {
    gap: 16,                   // Space between children
    padding: 20,               // Space inside
    margin: 10,                // Space outside
  },
});
```

### Common Components
```typescript
import { View, Text, ScrollView, Image, Pressable } from 'react-native';

<View>                    {/* Container (like <div>) */}
<Text>Hello</Text>       {/* Text (like <p>) */}
<ScrollView>             {/* Scrollable container */}
<Image source={{uri: 'url'}} /> {/* Image */}
<Pressable onPress={() => {}}> {/* Button-like element */}
```

### Platform-Specific Code
```typescript
import { Platform } from 'react-native';

Platform.OS === 'ios'     // Check iOS
Platform.OS === 'android' // Check Android
Platform.OS === 'web'     // Check web

// Or use Platform.select
Platform.select({
  ios: 'iOS specific',
  android: 'Android specific',
  default: 'Other platforms'
})
```

---

## 🚀 Customization Quick-Start

### 1. Change App Name
Edit **app.json**:
```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug"
  }
}
```

### 2. Change Theme Colors
Edit **constants/theme.ts**:
```typescript
const tintColorLight = '#0a7ea4';  // Change to your color
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',          // Change text color
    background: '#fff',       // Change background
    tint: tintColorLight,     // Change accent
    // ...
  }
}
```

### 3. Add New Screen
1. Create file: `app/(tabs)/myscreen.tsx`
2. Add to tab navigation in `app/(tabs)/_layout.tsx`
3. Add icon import and `<Tabs.Screen>` entry

### 4. Create Custom Component
Create file: `components/my-component.tsx`
```typescript
import { View, Text, StyleSheet } from 'react-native';

export function MyComponent({ title }: { title: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f0f0f0' },
  text: { fontSize: 16, fontWeight: 'bold' }
});
```

### 5. Add Icons
Icons come from `@expo/vector-icons`. Use in components:
```typescript
import { MaterialIcons } from '@expo/vector-icons';

<MaterialIcons name="home" size={24} color="black" />
```

### 6. Run on Device
```bash
npm start          # Start dev server
npm run ios        # Run iOS simulator
npm run android    # Run Android emulator
npm run web        # Run in web browser
```

---

## 📚 Useful Resources

- **Expo Documentation**: https://docs.expo.dev
- **React Native Docs**: https://reactnative.dev
- **Expo Router Guide**: https://docs.expo.dev/routing/introduction/
- **React Reanimated**: https://docs.swmansion.com/react-native-reanimated/
- **React Navigation**: https://reactnavigation.org

---

## 💡 Summary: File Organization

| **Category** | **Files** | **Purpose** |
|---|---|---|
| **Config** | `app.json`, `package.json`, `tsconfig.json`, `eslint.config.js` | App settings & dependencies |
| **Routing** | `app/_layout.tsx`, `app/(tabs)/_layout.tsx`, `app/(tabs)/index.tsx`, `app/(tabs)/explore.tsx`, `app/modal.tsx` | Navigation & screens |
| **Components** | `components/*.tsx`, `components/ui/*.tsx` | Reusable UI elements |
| **Styling** | `constants/theme.ts` | Colors, fonts, themes |
| **Hooks** | `hooks/*.ts` | Custom React logic |
| **Assets** | `assets/images/` | Images & icons |
| **Scripts** | `scripts/reset-project.js` | Automation |

---

**Now you have a complete guide to customize the mobile app! Start with the theme colors, then add new screens and features.**
