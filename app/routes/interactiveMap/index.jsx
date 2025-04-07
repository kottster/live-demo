import { Page, usePage } from '@kottster/react'; 
import GoToGithubButton from '../../components/goToGithubButton';

export default () => {
  const { navItem } = usePage();

  return (
    <Page 
      title={navItem?.name}
      headerRightSection={
        <GoToGithubButton link='https://github.com/kottster/live-demo/blob/main/app/routes/interactiveMap/index.jsx' />
      }  
      headerBottomSection={
        <p className='text-gray-600 mt-2 pb-2'>
          A page with an embedded Google Maps iframe.
        </p>
      }
    >
      <div className='border border-gray-200 rounded h-screen'>
         <iframe
           width='100%'
           height='100%'
           src='https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Eiffel%20Tower,%20Paris%20France+(Eiffel%20Tower,%20Paris%20France)&amp;t=p&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'
         />
       </div>
    </Page>
  );
};