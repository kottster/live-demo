import { TablePage } from '@kottster/react';
import { OneToOneRelation } from '@kottster/server';
import { app } from '../.server/app';
import dataSource from '../.server/data-sources/postgres';
import GoToGithubButton from '../components/goToGithubButton';

export const action = app.defineTableController(dataSource, {
  table: 'courses',
  primaryKeyColumn: 'id',
  select: {
    pageSize: 15,
    excludeColumns: [],
    searchableColumns: ['name', 'description', 'link'],
    sortableColumns: ['id', 'price', 'available']
  },
  insert: true,
  update: true,
  delete: true,
  linked: {
    linked_instructors_by_instructor_id: new OneToOneRelation({
      relation: 'oneToOne',
      foreignKeyColumn: 'instructor_id',
      targetTable: 'instructors',
      targetTableKeyColumn: 'id',
      columns: ['first_name', 'last_name'],
      searchableColumns: ['first_name', 'last_name']
    })
  }
});

export default () => (
  <TablePage
    headerRightSection={
      <GoToGithubButton link='https://github.com/kottster/live-demo/blob/main/app/routes/courses.jsx' />
    }
    headerBottomSection={
      <p className='text-gray-600 mt-4'>
        A table with data from the "courses" table, supporting record creation,
        reading, updating, and deletion.
      </p>
    }
    columns={[
      {
        column: 'name',
        width: 300,
        render: (r) => <span className='font-semibold'>{r.name}</span>
      },
      {
        label: 'Payment type',
        column: 'type',
        render: (r) =>
          ({
            FREE: 'Free',
            INCLUDED_IN_SUBSCRIPTION: 'Included',
            PAID: 'Paid'
          })[r.type]
      },
      {
        column: 'price',
        render: (r) => (r.price ? `$${r.price}` : 'N/A')
      },
      {
        label: 'Instructor',
        column: 'instructor_id',
        linked: 'linked_instructors_by_instructor_id'
      },
      {
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
    ]}
    form={{
      fields: [
        {
          column: 'name',
          required: true,
          formField: { type: 'input' }
        },
        {
          column: 'description',
          required: false,
          formField: { type: 'textarea' }
        },
        {
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
        {
          column: 'price',
          required: false,
          formField: { type: 'numberInput' }
        },
        {
          label: 'Instructor',
          column: 'instructor_id',
          required: true,
          formField: { type: 'recordSelect' }
        },
        {
          column: 'link',
          required: true,
          formField: { type: 'input' }
        },
        {
          label: 'Course is available for purchase',
          column: 'available',
          required: true,
          formField: { type: 'checkbox' }
        }
      ]
    }}
  />
);
