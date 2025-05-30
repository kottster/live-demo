import { Group, Text } from '@mantine/core';

export function SettingsBlock({ title, description, children }) {
  return (
    <Group justify='space-between' wrap='nowrap' gap='xl'>
      <div>
        <Text mb={4} fw={600}>
          {title}
        </Text>
        <Text size='xs' c='dimmed'>
          {description}
        </Text>
      </div>
      {children}
    </Group>
  );
}
