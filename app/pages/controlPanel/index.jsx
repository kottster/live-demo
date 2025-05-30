import { useEffect, useState } from 'react';
import { Page, useCallProcedure } from '@kottster/react';
import { Button, Card, Divider, Group, Input, SegmentedControl, Select, Switch } from '@mantine/core';
import { SettingsBlock } from './ui/settingsBlock';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { InvoicePaymentDeadline, SitemapUpdateFrequency } from './mockup';

/**
 * Learn more about building custom pages:
 * https://kottster.app/docs/custom-pages/introduction
 */

export default () => {
  const callProcedure = useCallProcedure();
  const [settings, setSettings] = useState();
  const fetchSettings = async () => {
    try {
      const data = await callProcedure('getSettings', {});
      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const updateMaintainanceMode = async (value) => {
    try {
      await callProcedure('updateMaintainanceMode', value);
      notifications.show({
        title: 'Success',
        message: 'Maintainance mode has been updated successfully.',
        color: 'green',
      });
      fetchSettings();
    } catch (error) {
      console.error('Error updating maintainance mode:', error);
    }
  };

  const updateSitemapUpdateFrequency = async (value) => {
    try {
      await callProcedure('updateSitemapUpdateFrequency', value);
      notifications.show({
        title: 'Success',
        message: 'Sitemap update frequency has been updated successfully.',
        color: 'green',
      });
      fetchSettings();
    } catch (error) {
      console.error('Error updating sitemap update frequency:', error);
    }
  };

  const [exportDataLoading, setExportDataLoading] = useState(false);
  const exportData = async (email) => {
    setExportDataLoading(true);
    try {
      await callProcedure('exportData', { email });
      notifications.show({
        title: 'Success',
        message: 'The data export has been initiated successfully.',
        color: 'green',
      });
      fetchSettings();
    } catch (error) {
      console.error('Error exporting data:', error);
    } finally {
      setExportDataLoading(false);
    }
  };

  const updateInvoicePaymentDeadline = async (value) => {
    try {
      await callProcedure('updateInvoicePaymentDeadline', value);
      notifications.show({
        title: 'Success',
        message: 'The deadline has been updated successfully.',
        color: 'green',
      });
      fetchSettings();
    } catch (error) {
      console.error('Error updating invoice payment deadline:', error);
    }
  };

  const [resetAllApiKeysLoading, setResetAllApiKeysLoading] = useState(false);
  const resetAllApiKeys = async () => {
    modals.openConfirmModal({
      title: 'Are you sure?',
      children: 'This action will revoke and regenerate all API keys. Are you sure you want to proceed?',
      labels: { confirm: 'Yes, reset', cancel: 'No, cancel' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        setResetAllApiKeysLoading(true);
        try {
          await callProcedure('resetAllApiKeys', {});
          fetchSettings();
        } catch (error) {
          console.error('Error resetting all API keys:', error);
        } finally {
          setResetAllApiKeysLoading(false);
          notifications.show({
            title: 'Success',
            message: 'All API keys have been reset successfully.',
            color: 'green',
          });
        }
      },
    });
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  if (!settings) {
    return null;
  }

  return (
    <Page maxContentWidth={800}>
      <Card withBorder radius='md' p='md'>
        <SettingsBlock
          title='Maintainance Mode'
          description='All users will be logged out and redirected to a custom page.'
        >
          <Switch
            defaultChecked={settings?.maintainanceMode}
            onChange={(event) => {
              updateMaintainanceMode(event.currentTarget.checked);
            }}
            size='sm'
            label='Enabled'
            fw={600}
          />
        </SettingsBlock>

        <Divider my='lg' />

        <SettingsBlock title='Sitemap Update Frequency' description='Set how often the sitemap should be updated.'>
          <Select
            defaultValue={settings?.sitemapUpdateFrequency}
            onChange={(value) => value && updateSitemapUpdateFrequency(value)}
            checkIconPosition='right'
            allowDeselect={false}
            data={[
              { value: SitemapUpdateFrequency.EveryHour, label: 'Every Hour' },
              { value: SitemapUpdateFrequency.EveryDay, label: 'Every Day' },
              { value: SitemapUpdateFrequency.EveryWeek, label: 'Every Week' },
              {
                value: SitemapUpdateFrequency.EveryMonth,
                label: 'Every Month',
              },
            ]}
          />
        </SettingsBlock>

        <Divider my='lg' />

        <SettingsBlock
          title='Request Data Export'
          description='Export all user and company data as a downloadable file.'
        >
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const email = formData.get('email');
              if (email) {
                exportData(email);
              }
              event.currentTarget.reset();
            }}
          >
            <Group gap='xs'>
              <Input placeholder='Enter email address' type='email' size='sm' w={250} name='email' required />
              <Button variant='light' type='submit' loading={exportDataLoading}>
                Send
              </Button>
            </Group>
          </form>
        </SettingsBlock>

        <Divider my='lg' />

        <SettingsBlock
          title='Invoice Payment Deadline'
          description='Define the default period before an invoice is considered overdue.'
        >
          <SegmentedControl
            defaultValue={settings?.invoicePaymentDeadline}
            onChange={(value) => value && updateInvoicePaymentDeadline(value)}
            data={[
              { value: InvoicePaymentDeadline.SevenDays, label: '7 Days' },
              { value: InvoicePaymentDeadline.FourteenDays, label: '14 Days' },
              { value: InvoicePaymentDeadline.None, label: 'No Deadline' },
            ]}
          />
        </SettingsBlock>

        <Divider my='lg' />

        <SettingsBlock
          title='Reset All API Keys'
          description='Revoke and regenerate API keys for all users and integrations.'
        >
          <Button variant='filled' color='red' onClick={() => resetAllApiKeys()} loading={resetAllApiKeysLoading}>
            Reset API Keys
          </Button>
        </SettingsBlock>
      </Card>
    </Page>
  );
};
