import React from 'react';

// Define a type for the common component props
type CommonProps = {
  title: string;
  backgroundColor: string;
  children: JSX.Element[] | JSX.Element
};

// The base component
const BaseComponent: React.FC<CommonProps> = ({ title, backgroundColor }) => {
  const componentStyle = {
    backgroundColor: backgroundColor,
    padding: '20px',
    borderRadius: '5px',
  };

  return (
    <div style={componentStyle}>
      <h3>{title}</h3>
    </div>
  );
};

// Define a type for the extended component props
type ExtendedProps = CommonProps & {
  subtitle: string;
  textColor: string;
};

// The extended component
const ExtendedComponent: React.FC<ExtendedProps> = ({
  title,
  backgroundColor,
  subtitle,
  textColor,
}) => {
  const extendedStyle = {
    color: textColor,
  };

  // Use BaseComponent and extend it with additional contents and styles
  return (
    <BaseComponent title={title} backgroundColor={backgroundColor}>
      <p style={extendedStyle}>{subtitle}</p>
      <p style={extendedStyle}>{subtitle}</p>
    </BaseComponent>
  );
};
