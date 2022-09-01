import * as React from 'react';

import containers from '../Categories/containers/CategoriesPage'

// type TParams = { id: string };

// function Product({ match }: RouteComponentProps<TParams>) {
//   return <h2>This is a page for product with ID: {match.params.id} </h2>;
// }

setTimeout(() => {
  const div = document.querySelector('#divKnowledge');
  if (div)
    div!.setAttribute('style', 'display:none')
}, 10000)

const Support: React.FC<{}> = () => {
  return (
    <>
      <h2 style={{textAlign: 'center', marginBlockStart: '0.66rem', marginBlockEnd: '0.1rem' }}>Questions &amp; Answers</h2>
      <div id='divKnowledge' className='knowledge'>
        <h5 style={{textAlign: 'center', color: 'blue', fontSize:'15px'}}><i>A knowledge base for sharing information. 
          <br/>When you record your experiences and insights, <br/>other members of your team can share info.
          </i></h5>
      </div>
      <containers.supporter canEdit={true} />
    </>
  );
};

export default Support;