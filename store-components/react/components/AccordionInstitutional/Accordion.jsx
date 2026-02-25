import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

import AccordionItem from './AccordionItem';

const Accordion = ({ questionsAnswers }) => {
  const [clicked, setClicked] = useState('0');

  const handleToggle = (index) => {
    if (clicked === index) {
      return setClicked('0');
    }

    setClicked(index);
  };

  return (
    <>
      <Helmet>
        <html lang="pt-BR" itemScope itemType="https://schema.org/FAQPage" />
      </Helmet>
      <ul className="accordion">
        {questionsAnswers.map((faq, index) => (
          <AccordionItem
            onToggle={() => handleToggle(index)}
            active={clicked === index}
            key={index}
            faq={faq}
          />
        ))}
      </ul>
    </>
  );
};

export default Accordion;
