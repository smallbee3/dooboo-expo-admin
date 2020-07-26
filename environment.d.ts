declare module '*.svg' {
  import { IconType } from './src/types';

  const content: IconType;
  export default content;
}

declare module '*.json' {
  const content;
  export default content;
}

declare module '*.png' {
  const content;
  export default content;
}

declare module '*.jpg' {
  const content;
  export default content;
}

declare module '*.svg' {
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module 'babel-plugin-relay/macro' {
  export { graphql } from 'react-relay';
}
