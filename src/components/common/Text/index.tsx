import React from 'react';
import { Text as ReactNativeText, TextProps } from 'react-native';

import { Text as TextStyles } from 'styles';

interface TextPropsType extends TextProps {
  children: React.ReactNode;
}

function Text(props: TextPropsType) {
  return (
    <ReactNativeText
      {...props}
      style={[TextStyles.common, props.style || {}]}
      allowFontScaling={false}
    >
      {props.children}
    </ReactNativeText>
  );
}

export default Text;
