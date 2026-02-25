import React from 'react';

import Accordion from './Accordion';

import './styles.global.css';

const FaqEstruturadaGlobal = (props) => {
  const isEmpty = Object.keys(props.questionsAnswers).length === 0;

  return (
    <>
      <div className="container-faq-global">
        {isEmpty ? (
          ''
        ) : (
          <Accordion questionsAnswers={props.questionsAnswers.listQuestions} />
        )}
      </div>
    </>
  );
};

export default FaqEstruturadaGlobal;

FaqEstruturadaGlobal.defaultProps = {
  questionsAnswers: {
    listQuestions: [],
  },
};

FaqEstruturadaGlobal.getSchema = () => {
  return {
    title: 'Faq estruturada - GLOBAL',
    description: 'Perguntas e respostas estruturadas - Pra uso GLOBAL do site',
    type: 'object',
    properties: {
      questionsAnswers: {
        type: 'object',
        title: 'Lista perguntas',
        properties: {
          listQuestions: {
            type: 'array',
            title: 'Perguntas e resposta - Lista',
            items: {
              type: 'object',
              title: 'Item SubMenu',
              properties: {
                question: {
                  type: 'string',
                  title: 'Título Pergunta',
                },
                answer: {
                  type: 'string',
                  title: 'Descrição Resposta',
                },
              },
            },
          },
        },
      },
    },
  };
};
