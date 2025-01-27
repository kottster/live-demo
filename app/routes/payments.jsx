import { Page, usePage } from '@kottster/react';
import { Table } from '@kottster/react';
import { app } from '../.server/app';
import dataSource from '../.server/data-sources/postgres';
import GoToGithubButton from '../components/goToGithubButton';

export const action = app.defineTableController(dataSource, {
  table: 'payments',
  primaryKeyColumn: 'id',
  select: {
    pageSize: 20,
    excludeColumns: ['created_at'],
    sortableColumns: ['id']
  },
  insert: false,
  update: false,
  delete: false,
  linked: {
    linked_users_by_user_id: {
      relation: 'oneToOne',
      foreignKeyColumn: 'user_id',
      targetTable: 'users',
      targetTableKeyColumn: 'id',
      columns: ['first_name', 'last_name'],
      searchableColumns: ['first_name', 'last_name']
    },
    linked_billing_plans_by_plan_id: {
      relation: 'oneToOne',
      foreignKeyColumn: 'plan_id',
      targetTable: 'billing_plans',
      targetTableKeyColumn: 'id',
      columns: ['name'],
      searchableColumns: ['name']
    },
    linked_payment_methods_by_payment_method_id: {
      relation: 'oneToOne',
      foreignKeyColumn: 'payment_method_id',
      targetTable: 'payment_methods',
      targetTableKeyColumn: 'id',
      columns: ['name'],
      searchableColumns: ['name']
    },
    linked_payment_courses: {
      relation: 'manyToMany',

      // Junction table details
      junctionTable: 'payment_courses',
      junctionTableSourceKeyColumn: 'payment_id',
      junctionTableTargetKeyColumn: 'course_id',

      // Target table details
      targetTable: 'courses',
      targetTableKeyColumn: 'id',
      columns: ['id', 'name'],
      searchableColumns: ['name']
    }
  }
});

export default () => {
  const { navItem } = usePage();

  return (
    <Page
      title={navItem.name}
      headerRightSection={
        <GoToGithubButton link='https://github.com/kottster/live-demo/blob/main/app/routes/payments.jsx' />
      }
    >
      <p className='text-gray-600 mb-9 -mt-4'>
        A table displaying data from the "subscriptions" database table and
        related data from linked tables like "users", "courses",
        "billing_plans", and "payment_methods".
      </p>

      <Table
        columns={[
          {
            column: 'id'
          },
          {
            label: 'User',
            column: 'user_id',
            linked: 'linked_users_by_user_id'
          },
          {
            label: 'Plan',
            column: 'plan_id',
            linked: 'linked_billing_plans_by_plan_id'
          },
          {
            label: 'Payment Method',
            column: 'payment_method_id',
            linked: 'linked_payment_methods_by_payment_method_id'
          },
          {
            label: 'Purchase Courses',
            column: 'payment_courses',
            linked: 'linked_payment_courses'
          },
          {
            column: 'created_at',
            width: 160
          }
        ]}
      >
        <Table.RecordModal
          fields={[
            {
              column: 'amount',
              required: true,
              formField: { type: 'input' }
            },
            {
              column: 'user_id',
              required: true,
              formField: { type: 'recordSelect' }
            },
            {
              column: 'plan_id',
              required: true,
              formField: { type: 'recordSelect' }
            },
            {
              column: 'payment_method_id',
              required: false,
              formField: { type: 'recordSelect' }
            },
            {
              column: 'active',
              required: true,
              formField: { type: 'checkbox' }
            },
            {
              column: 'created_at',
              required: true,
              formField: { type: 'datePicker', withTime: true }
            },
            {
              column: 'canceled_at',
              required: false,
              formField: { type: 'datePicker', withTime: true }
            },
            {
              column: 'canceled_reason',
              required: false,
              formField: { type: 'textarea' }
            }
          ]}
        />
      </Table>
    </Page>
  );
};
