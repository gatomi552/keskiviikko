import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon sf="house.fill" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <Label>Settings</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">{/*Se necesita el nombre de la carpeta xd*/}
        <Label>Perfiles</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
