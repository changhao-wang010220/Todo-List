import { useContext } from 'react';
import AccordionContext from 'react-bootstrap/AccordionContext';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { Card } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons'

function ContextAwareToggle(props) {
  const { children, eventKey} = props;
  const { activeEventKey } = useContext(AccordionContext);
  const decoratedOnClick = useAccordionButton(eventKey);
  const isCurrentEventKey = (activeEventKey === eventKey);
  
  return (
    <Card.Header onClick={decoratedOnClick} className='user-select-none'>
        {children}
        <FontAwesomeIcon icon={faCaretDown} className={isCurrentEventKey ? "ps-1" : "d-none"}/>
        <FontAwesomeIcon icon={faCaretRight} className={isCurrentEventKey ? "d-none": "ps-1"}/>
    </Card.Header>
  );
}
export default ContextAwareToggle;

