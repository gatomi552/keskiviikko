import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
  return (
    <NativeTabs>

      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon 
          // SF Symbol (iOS)
          sf="house.fill"  
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <Label>Perfiles</Label>
        <Icon
          sf="person.crop.circle.fill"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="settings">
      <Label hidden />
        <Icon
          sf="gearshape.fill"
        />
      </NativeTabs.Trigger>

    </NativeTabs>
  );
}
