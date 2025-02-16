import { OneToOneRelation, OneToManyRelation } from '@kottster/server';
import { TablePage } from '@kottster/react';
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
    paymentMethodsByPaymentMethodId: new OneToOneRelation({
      foreignKeyColumn: 'payment_method_id',
      targetTable: 'payment_methods',
      targetTableKeyColumn: 'id',
      previewColumns: ['name'],
      searchableColumns: ['name']
    }),
    billingPlansByPlanId: new OneToOneRelation({
      foreignKeyColumn: 'plan_id',
      targetTable: 'billing_plans',
      targetTableKeyColumn: 'id',
      previewColumns: ['name'],
      searchableColumns: ['name']
    }),
    usersByUserId: new OneToOneRelation({
      foreignKeyColumn: 'user_id',
      targetTable: 'users',
      targetTableKeyColumn: 'id',
      previewColumns: ['first_name', 'last_name'],
      searchableColumns: ['first_name', 'last_name']
    }),
    paymentCourses: new OneToManyRelation({
      targetTable: 'payment_courses',
      targetTableKeyColumn: 'id',
      targetTableForeignKeyColumn: 'payment_id',
      searchableColumns: [],
      linked: {
        paymentCoursesCoursesByCourseId: new OneToOneRelation({
          foreignKeyColumn: 'course_id',
          targetTable: 'courses',
          targetTableKeyColumn: 'id',
          previewColumns: ['name'],
          columns: ['name', 'price', 'link', 'available'],
          searchableColumns: ['name']
        })
      }
    })
  }
});

export default () => (
  <TablePage
    headerRightSection={
      <GoToGithubButton link='https://github.com/kottster/live-demo/blob/main/app/routes/payments.jsx' />
    }
    headerBottomSection={
      <p className='text-gray-600 mt-4'>
        A table displaying data from the "subscriptions" database table and
        related data from linked tables like "users", "courses",
        "billing_plans", and "payment_methods".
      </p>
    }
    columns={[
      {
        column: 'id'
      },
      {
        label: 'User',
        column: 'user_id',
        linkedKey: 'usersByUserId'
      },
      {
        label: 'Plan',
        column: 'plan_id',
        linkedKey: 'billingPlansByPlanId'
      },
      {
        label: 'Payment Method',
        column: 'payment_method_id',
        linkedKey: 'paymentMethodsByPaymentMethodId'
      },
      {
        label: 'Purchased Courses',
        linkedKey: 'paymentCourses'
      },
      {
        column: 'amount',
        render: (r) => `$${r.amount}`
      },
      {
        column: 'created_at',
        width: 160
      }
    ]}
    form={{
      fields: [
        {
          column: 'amount',
          required: true,
          formField: { type: 'input' }
        },
        {
          column: 'user_id',
          required: true,
          formField: {
            type: 'recordSelect',
            linkedKey: 'usersByUserId'
          }
        },
        {
          column: 'plan_id',
          required: true,
          formField: {
            type: 'recordSelect',
            linkedKey: 'billingPlansByPlanId'
          }
        },
        {
          column: 'payment_method_id',
          required: false,
          formField: {
            type: 'recordSelect',
            linkedKey: 'paymentMethodsByPaymentMethodId'
          }
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
      ]
    }}
  />
);
