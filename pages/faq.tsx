import React, { useState } from 'react';
import PageBanner from '../components/Common/PageBanner';

const Faq = ({ data }) => {
  const [clicked, setClicked] = useState<boolean | null | number>(false);
  const [toggleState, setToggleState] = useState(1);

  const toggle = (index) => {
    if (clicked === index) {
      return setClicked(null);
    }
    setClicked(index);
  };

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <>
      <PageBanner
        pageTitle='Frequently Asked Question'
        pageSubTitle='How can we help you today?'
      />

      <div className='faq-area ptb-100'>
        <div className='container'>
          <div className='faq-accordion'>
            <ul className='nav nav-tabs' id='myTab' role='tablist'>
              
              <li className='nav-item' role='presentation'>
                <button
                  className={toggleState === 2 ? 'nav-link active' : 'nav-link'}
                  onClick={() => toggleTab(2)}
                  id='account-tab'
                  data-bs-toggle='tab'
                  data-bs-target='#account'
                  type='button'
                  role='tab'
                  aria-controls='account'
                  aria-selected='false'
                >
                  <i className='bx bx-info-circle'></i>
                  Account
                </button>
              </li>
              <li className='nav-item' role='presentation'>
                <button
                  className={toggleState === 3 ? 'nav-link active' : 'nav-link'}
                  onClick={() => toggleTab(3)}
                  id='orders-tab'
                  data-bs-toggle='tab'
                  data-bs-target='#orders'
                  type='button'
                  role='tab'
                  aria-controls='orders'
                  aria-selected='false'
                >
                  <i className='bx bxs-badge-dollar'></i>
                  Orders
                </button>
              </li>
              <li className='nav-item' role='presentation'>
                <button
                  className={toggleState === 4 ? 'nav-link active' : 'nav-link'}
                  onClick={() => toggleTab(4)}
                  id='usage-guides-tab'
                  data-bs-toggle='tab'
                  data-bs-target='#usage-guides'
                  type='button'
                  role='tab'
                  aria-controls='usage-guides'
                  aria-selected='false'
                >
                  <i className='bx bx-book-open'></i>
                  Usage Guides
                </button>
              </li>
            </ul>
            <div className='tab-content' id='myTabContent'>
              <div
                className={
                  toggleState === 1
                    ? 'active show tab-pane fade'
                    : 'tab-pane fade'
                }
                id='novis-direct'
                role='tabpanel'
              >
                <div className='accordion' id='accordionFaq'>
                  {data.slice(0,6).map((data, index) => (
                    <div
                      key={index}
                      className='accordion-item'
                      onClick={() => toggle(index)}
                    >
                      <button
                        className='accordion-button'
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#collapse1'
                        aria-expanded='true'
                        aria-controls='collapse1'
                      >

                        {data.question}
                        <span>
                          {clicked === index ? (
                            <i className='bx bx-chevron-up'></i>
                          ) : (
                            
                            <i className='bx bx-chevron-down'></i>
                          )}
                        </span>
                      </button>
                      <div
                        id='collapse1'
                        className='accordion-collapse collapse show'
                        data-bs-parent='#accordionFaq'
                      >
                        {clicked === index ? (
                          <div className='accordion-body'>
                            <p>{data.answer}</p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className={
                  toggleState === 2
                    ? 'active show tab-pane fade'
                    : 'tab-pane fade'
                }
                id='account'
                role='tabpanel'
              >
                <div className='accordion' id='accordionFaq2'>
                  {data.slice(6,12).map((data, index) => (
                    <div
                      key={index}
                      className='accordion-item'
                      onClick={() => toggle(index)}
                    >
                      <button
                        className='accordion-button'
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#collapse7'
                        aria-expanded='true'
                        aria-controls='collapseOne'
                      >
                        {data.question}
                        <span>
                          {clicked === index ? (
                            <i className='bx bx-chevron-up'></i>
                          ) : (
                            
                            <i className='bx bx-chevron-down'></i>
                          )}
                        </span>
                        
                      </button>
                      <div
                        id='collapse7'
                        className='accordion-collapse collapse show'
                        data-bs-parent='#accordionFaq2'
                      >
                        {clicked === index ? (
                          <div className='accordion-body'>
                            <p>
                              <strong>novis</strong> is always looking for
                              talented <a href='#'>information</a> security and
                              IT risk management professionals who are
                              dedicated, hard working and looking for a
                              challenge. If you are interested in employment
                              with <strong>novis</strong>, a company who values
                              you and your family, visit our careers page.
                            </p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className={
                  toggleState === 3
                    ? 'active show tab-pane fade'
                    : 'tab-pane fade'
                }
                id='orders'
                role='tabpanel'
              >
                <div className='accordion' id='accordionFaq3'>
                  {data.slice(12,18).map((data, index) => (
                    <div
                      key={index}
                      className='accordion-item'
                      onClick={() => toggle(index)}
                    >
                      <button
                        className='accordion-button'
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#collapse13'
                        aria-expanded='true'
                        aria-controls='collapse13'
                      >
                       {data.question}
                        <span>
                          {clicked === index ? (
                            <i className='bx bx-chevron-up'></i>
                          ) : (
                            
                            <i className='bx bx-chevron-down'></i>
                          )}
                        </span>
                      </button>
                      <div
                        id='collapse13'
                        className='accordion-collapse collapse show'
                        data-bs-parent='#accordionFaq3'
                      >
                        {clicked === index ? (
                          <div className='accordion-body'>
                            <p>
                              <strong>novis</strong> is always looking for
                              talented <a href='#'>information</a> security and
                              IT risk management professionals who are
                              dedicated, hard working and looking for a
                              challenge. If you are interested in employment
                              with <strong>novis</strong>, a company who values
                              you and your family, visit our careers page.
                            </p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className={
                  toggleState === 4
                    ? 'active show tab-pane fade'
                    : 'tab-pane fade'
                }
                id='usage-guides'
                role='tabpanel'
              >
                <div className='accordion' id='accordionFaq4'>
                  {data.slice(14,20).map((data, index) => (
                    <div
                      key={index}
                      className='accordion-item'
                      onClick={() => toggle(index)}
                    >
                      <button
                        className='accordion-button'
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#collapse19'
                        aria-expanded='true'
                        aria-controls='collapse19'
                      >
                        {data.question}
                        <span>
                          {clicked === index ? (
                            <i className='bx bx-chevron-up'></i>
                          ) : (
                            
                            <i className='bx bx-chevron-down'></i>
                          )}
                        </span>
                      </button>
                      <div
                        id='collapse19'
                        className='accordion-collapse collapse show'
                        data-bs-parent='#accordionFaq4'
                      >
                        {clicked === index ? (
                          <div className='accordion-body'>
                            <p>
                              <strong>novis</strong> is always looking for
                              talented <a href='#'>information</a> security and
                              IT risk management professionals who are
                              dedicated, hard working and looking for a
                              challenge. If you are interested in employment
                              with <strong>novis</strong>, a company who values
                              you and your family, visit our careers page.
                            </p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Faq.defaultProps = {
  data: [
    {
      question: 'What shipping methods are available?',
      answer:
        'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. Conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      question: 'Do you ship internationally?',
      answer:
        'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. Conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      question: 'How do I place an order?',
      answer:
        'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. Conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      question:
        'Is it possible to pay for an order with Visa and MasterCard payment cards?',
      answer:
        'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. Conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      question: 'How long will it take to get my package?',
      answer:
        'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. Conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      question: 'What payment methods are accepted?',
      answer:
        'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. Conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      question: 'Can I return the product after purchase?',
      answer:
        'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. Conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    
    {
      question: 'How can I create an account?',
      answer:
        'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. Conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },

    {
      question: 'What are the requirements for registering an Novis Direct account?',
      answer:
        'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. Conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },

    {
      question: 'Which name should I use to register my Novis Direct account?',
      answer:
        'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. Conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      question: 'Can I place an order without creating an account?',
      answer:
        'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. Conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      question: 'Can I change my personal details later?',
      answer:
        'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. Conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      question: 'What makes a good password?',
      answer:
        'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. Conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      question: 'What is an order ID and where can I find it?',
      answer:
        'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. Conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      question: 'Is it possible to cancel my order?',
      answer:
        'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. Conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      question: 'I have sent the coins to the wrong wallet address, what should I do?',
      answer:
        'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. Conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      question: 'Which payment methods are supported by Novis Direct?',
      answer:
        'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. Conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      question: 'Is Novis Direct GDPR compliant?',
      answer:
        'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. Conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      question: 'I have entered the wrong wallet address, what should I do?',
      answer:
        'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. Conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },

    {
      question: 'How can I create an account?',
      answer:
        'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. Conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },

    {
      question: 'What are the requirements for registering an Novis Direct account?',
      answer:
        'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. Conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },

    {
      question: 'Which name should I use to register my Novis Direct account?',
      answer:
        'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. Conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      question: 'Can I place an order without creating an account?',
      answer:
        'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. Conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      question: 'Can I change my personal details later?',
      answer:
        'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. Conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      question: 'What makes a good password?',
      answer:
        'Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip. Conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  ],
};

export default Faq;
