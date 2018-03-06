import React from 'react';

export default function(props) {
  return (
    <time>{props.value.format('d[d]:h[h]:mm[m]:ss[s]')}</time>
  );
}
