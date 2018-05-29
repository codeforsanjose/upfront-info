import React, { Component } from 'react';

function InputQuestion(props) {
  return (
    <div>
      <h1>{props.question}</h1>
      <input type='text' />
    </div>
  );
};

export default InputQuestion