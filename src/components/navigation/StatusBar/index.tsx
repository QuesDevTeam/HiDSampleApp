import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';

import { getBackgroundStyleByAlias } from 'functions/wrapper';

import { RootState } from 'store';

function CustomStatusBar() {
  const { aliasForWrapper } = useSelector((state: RootState) => ({
    aliasForWrapper: state.navigation.aliasForWrapper,
  }));

  const backgroundStyle = getBackgroundStyleByAlias(aliasForWrapper);

  return (
    <>
      <SafeAreaView
        style={[
          {
            flex: 0,
            overflow: 'visible',
          },
          backgroundStyle,
        ]}
      />
      <StatusBar
        animated
        backgroundColor={backgroundStyle.backgroundColor}
        barStyle={'dark-content'}
      />
    </>
  );
}

export default CustomStatusBar;
