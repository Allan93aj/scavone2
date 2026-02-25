import React, { useRef } from 'react';

import SanitizeMarkup from './InsaneUtils';

import './styles.global.css';

const AccordionItem = ({ faq, active, onToggle }) => {
  const { question, answer } = faq;

  const contentEl = useRef();

  return (
    <li
      className={`accordion_item ${active ? 'active' : ''}`}
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
    >
      <button className="button" onClick={onToggle}>
        <h3 className="question" itemProp="name">
          {question}
        </h3>
        <span className="control">
          {active ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="14"
              viewBox="0 0 25 14"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.6882 1.88726L12.6683 0.866813L11.6484 1.88726L0.649038 12.8936L1.66894 13.9141L12.6683 2.90781L23.6676 13.9141L24.6875 12.8936L13.6882 1.88726Z"
                fill="black"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="14"
              viewBox="0 0 25 14"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.6478 12.8979L12.6677 13.9183L13.6876 12.8979L24.6869 1.8916L23.667 0.871094L12.6677 11.8773L1.6683 0.871094L0.648437 1.8916L11.6478 12.8979Z"
                fill="black"
              />
            </svg>
          )}{' '}
        </span>
      </button>
      <div
        ref={contentEl}
        className="answer_wrapper"
        style={
          active
            ? { height: contentEl.current.scrollHeight }
            : { height: '0px' }
        }
        itemScope
        itemProp="acceptedAnswer"
        itemType="https://schema.org/Answer"
      >
        <div className="answer">
          <p itemProp="text" dangerouslySetInnerHTML={SanitizeMarkup(answer)} />
        </div>
      </div>
    </li>
  );
};

export default AccordionItem;
