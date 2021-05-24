/**
 * https://stackoverflow.com/questions/34424845/adding-script-tag-to-react-jsx
 */

import { useEffect } from 'react';

const useScript = (url, node = document.body, scriptContent = null) => {
  useEffect(() => {
    const script = document.createElement('script');

    if (url) script.src = url;
    script.async = true;

    if (scriptContent) script.innerHTML = scriptContent;

    node.appendChild(script);

    return () => {
      node.removeChild(script);
    }
  }, [url, node, scriptContent]);
};

export default useScript;