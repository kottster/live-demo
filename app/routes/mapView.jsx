import { Page } from '@kottster/react';

export default () => {
  return (
    <Page>
      <div className='absolute top-0 left-0 right-0 bottom-0 border-l border-gray-200'>
        <iframe
          width='100%'
          height='100%'
          src='https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Eiffel%20Tower,%20Paris%20France+(Eiffel%20Tower,%20Paris%20France)&amp;t=p&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'
        />
      </div>
    </Page>
  );
};
