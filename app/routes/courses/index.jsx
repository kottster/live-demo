import { TablePage } from '@kottster/react';
import { app } from '../../.server/app';
import dataSource from '../../.server/data-sources/postgres';
import pageSettings from './settings.json';
import GoToGithubButton from '../../components/goToGithubButton';

/**
 * Learn more about configuring the table controller:
 * https://docs.kottster.app/table/configuration/api
 */
export const action = app.defineTableController(dataSource, {
  ...pageSettings
});

/**
 * Learn more about TablePage component and its properties:
 * https://docs.kottster.app/table/table-page-component
 */
export default () => (
  <TablePage
    headerRightSection={
      <GoToGithubButton link='https://github.com/kottster/live-demo/blob/main/app/routes/courses/index.jsx' />
    }
    headerBottomSection={
      <p className='text-gray-600 mt-2 pb-2'>
        A table with data from the "courses" table, supporting record creation,
        reading, updating, and deletion.
      </p>
    }
    columnOverrides={{
      name: {
        column: 'name',
        render: (r) => <span className='font-semibold'>{r.name}</span>
      },
      type: {
        column: 'type',
        label: 'Payment type',
        render: (r) =>
          ({
            FREE: 'Free',
            INCLUDED_IN_SUBSCRIPTION: 'Included',
            PAID: 'Paid'
          })[r.type]
      },
      price: {
        column: 'price',
        render: (r) => (r.price ? `$${r.price}` : 'N/A')
      },
      link: {
        column: 'link',
        render: (r) => (
          <a
            href={r.link}
            target='_blank'
            rel='noreferrer'
            className='text-blue-600'
          >
            Open
          </a>
        )
      }
    }}
    form={{
      fieldOverrides: {
        type: {
          label: 'Payment type',
          column: 'type',
          required: true,
          formField: {
            type: 'select',
            options: [
              { label: 'Free', value: 'FREE' },
              { label: 'Included', value: 'INCLUDED_IN_SUBSCRIPTION' },
              { label: 'Paid', value: 'PAID' }
            ]
          }
        },
        available: {
          label: 'Course is available for purchase',
          column: 'available',
          required: true,
          formField: { type: 'checkbox' }
        }
      }
    }}
  />
);
